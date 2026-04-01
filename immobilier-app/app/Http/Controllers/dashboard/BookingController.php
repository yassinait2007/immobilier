<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource\BookingResource;
use App\Models\Booking;
use App\Models\BookingStatus;
use App\Models\Manager;
use App\Models\Realstate;
use App\Models\TypeBooking;
use App\Models\User;
use App\Models\WhatsappMessage;
use App\utils\JsonResponses;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Mpdf\Mpdf;
use Throwable;
use WasenderApi\WasenderClient;


class BookingController extends Controller
{
    use JsonResponses;

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "checkin" => ["required", "date", "date_format:Y-m-d"],
            "checkout" => ["required", "date", "after:checkin", "date_format:Y-m-d"],
            "guest" => ["required", "integer", "gt:0"],
            "realestate" => ["required", "exists:realstates,id"],
            "client" => ["required", "exists:users,id"],
            "nightPrice" => ["required"],
            "signature" => ["required", "image", "mimes:png"],
            "typeGuest" => ["required"]
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        //=============check the transaction type
        $isRentable = Realstate::where("id", $request->input("realestate"))
            ->whereHas("type", function ($query) {
                $query->whereIn("code", ["rent-short", "vacation_rental"]);
            })->exists();

        if (!$isRentable) {
            return $this->validationErrorResponse([
                "msg" => ["Seuls les biens immobiliers de type location vacances peuvent être loués."]
            ]);
        }

        //=============check if the realestate is available at the given dates
        $checkin = Carbon::createFromFormat("Y-m-d", $request->input("checkin"));
        $checkout = Carbon::createFromFormat("Y-m-d", $request->input("checkout"));

        $busy = Booking::where("realestate_id", "=", $request->input("realestate"))
            ->where(function ($query) use ($checkin, $checkout) {
                $query->where("checkin", "<", $checkout->format("Y-m-d"))
                    ->where("checkout", ">", $checkin->format("Y-m-d"));
            })->whereHas("status", function ($query) {
                $query->where("code", "=", "payed");
            })->exists();


        if ($busy) {
            return $this->validationErrorResponse([
                "msg" => ["Ce bien est déjà réservé à ces dates."]
            ]);
        }

        //==============add booking
        $data = $validator->validate();
        $nbdays = $checkin->diffInDays($checkout);
        $data["nb_days"] = $nbdays;
        $data["nb_guest"] = $request->input("guest");
        $data["realestate_id"] = $request->input("realestate");
        $data["checkin"] = $checkin;
        $data["checkout"] = $checkout;
        $data["client_id"] = $data["client"];
        $status = BookingStatus::where("code", "=", "payed")->first() 
            ?? BookingStatus::firstOrCreate(['code' => 'payed'], ['status' => 'Payé']);
        $data["status_id"] = $status->id;
        $price = $data["nightPrice"];
        $data["amount"] = $price * $nbdays;
        $data["night_price"] = $price;
        $type = TypeBooking::where("code", "=", "realworld")->first() 
            ?? TypeBooking::firstOrCreate(['code' => 'realworld'], ['type' => 'Realworld']);
        $data["type_id"] = $type->id;
        $manager = $request->user();
        $data["created_by"] = $manager->id;
        $data["type_guest"] = $data["typeGuest"];

        DB::beginTransaction();
        try {

            $booking = Booking::create($data);


            if ((now()->isAfter($checkin) && now()->isBefore($checkout)) || now()->isSameDay($checkin)) {
                $realestate = $booking->realestate;
                $realestate->booking_id = $booking->id;
                $realestate->save();
            }

            // Load relationships
            $booking->load(['client', 'realestate.city', 'manager']);

            // Convert signature to base64
            $signatureFile = $request->file("signature");
            $signatureData = base64_encode(file_get_contents($signatureFile->getRealPath()));
            $signatureMimeType = $signatureFile->getMimeType();
            $signatureBase64 = "data:{$signatureMimeType};base64,{$signatureData}";

            //save signature
            $booking->addMedia($signatureFile)->toMediaCollection("signature");

            // Get agency info and logo
            $agence = User::where("agence", "1")->first();
            $logoUrl = $agence->getFirstMediaUrl("profile_photo");

            // Convert logo to base64 if it exists
            $logoBase64 = null;
            if ($logoUrl) {
                try {
                    // If logo is stored locally
                    $logoPath = $agence->getFirstMedia("profile_photo")->getPath();
                    $logoData = base64_encode(file_get_contents($logoPath));
                    $logoMimeType = mime_content_type($logoPath);
                    $logoBase64 = "data:{$logoMimeType};base64,{$logoData}";
                } catch (\Exception $e) {
                    // If logo is external URL, you might need to fetch it
                    $logoBase64 = null;
                }
            }


            $htmlPdfPrivate = view("pdf.contract", [
                'signature' => $signatureBase64,
                'logo' => $logoBase64,
                'booking' => $booking,
                'agence' => $agence,
                'manager' => $manager,
                "isPrivate" => true,
            ])->render();

            $mpdfPrivate = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'P',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 20,
                'margin_bottom' => 20,
                'autoScriptToLang' => true,
                'autoLangToFont' => true,
            ]);

            $mpdfPrivate->WriteHTML($htmlPdfPrivate);
            $privateContract = $mpdfPrivate->Output('', 'S');

            // Generate Public PDF (create new instance - don't clone)
            $htmlPdfPublic = view("pdf.contract", [
                'signature' => $signatureBase64,
                'logo' => $logoBase64,
                'booking' => $booking,
                'agence' => $agence,
                'manager' => $manager,
                "isPrivate" => false,
            ])->render();

            $mpdfPublic = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'P',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 20,
                'margin_bottom' => 20,
                'autoScriptToLang' => true,
                'autoLangToFont' => true,
            ]);

            $mpdfPublic->WriteHTML($htmlPdfPublic);
            $publicContract = $mpdfPublic->Output('', 'S');

            // Save PDFs to media library
            $booking->addMediaFromString($privateContract)
                ->usingFileName('contract-pr-' . time() . '.pdf')
                ->toMediaCollection("contract-private");

            $booking->addMediaFromString($publicContract)
                ->usingFileName('contract-pb-' . time() . '.pdf')
                ->toMediaCollection("contract-public");


            $booking->refresh();
            //send whatsapp message
            $clientPhone = $booking->client->tel;
            $clientPhone = str_replace("+", "", $clientPhone);

            // Ensure role exists to avoid RoleDoesNotExist exception
            \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'managers']);

            $adminPhones = Manager::role("admin")->where("id", "!=", $manager->id)->get()->map(function ($admin) {
                return str_replace("+", "", $admin->phone);
            });

            $document = $booking->getFirstMediaUrl("contract-private");
            $messageClient = WhatsappMessage::where("code", "new-booking-client")->first();
            $messageManager = WhatsappMessage::where("code", "new-booking-admin")->first();


            $wa = new WasenderClient(config("services.whatsapp.wasender_key"));

            //send to client

            if (!empty($clientPhone)) {
                try {
                    $wa->sendDocument(
                        $clientPhone,
                        $document,
                        $messageClient->message,
                        "bulletin_hebergement.pdf"
                    );
                } catch (Throwable $th) {
                    Log::error($th);
                }
            }

            //send to managers
            foreach ($adminPhones as $phone) {
                if (!empty($phone)) {
                    try {
                        $wa->sendDocument(
                            $phone,
                            $document,
                            $messageManager->message,
                            "bulletin_hebergement.pdf"
                        );
                    } catch (Throwable $th) {
                        Log::error($th);
                    }
                }
            }

            DB::commit();
            $response = new BookingResource($booking);

            return $this->createdResponse($response);
        } catch (Throwable $th) {
            DB::rollBack();
            //return $this->serverErrorResponse($th->getMessage());
            throw $th;
        }
    }




    public function index(Request $request)
    {
        $from = $request->input("from");
        $to = $request->input("to");

        $from = Carbon::parse($from)->startOfDay();
        $to = Carbon::parse($to)->endOfDay();

        $type = $request->input("type", "realworld");
        $realestate = $request->input("realestate");

        $bookings = Booking::with(["client", "type", "clientReview", "paymentMethod", "hostReview", "client", "realestate"])
            ->whereHas("type", function ($query) use ($type) {
                $query->where("code", "=", $type);
            })->when($request->filled("realestate"), function ($query) use ($realestate) {
                $query->where("realestate_id", "=", $realestate);
            })
            ->when(isset($from) && isset($to), function ($query) use ($from, $to) {
                $query->where("created_at", ">=", $from)
                    ->where("created_at", "<=", $to);
            })->orderBy("created_at", "desc")
            ->get();
        $response = BookingResource::collection($bookings);
        return $this->successResponse($response);
    }


    public function extendBooking(Request $request, $id)
    {
        $manager = $request->user();
        $newCheckout = Carbon::createFromFormat("Y-m-d", $request->input("checkout"));
        $newNightPrice = $request->input("price");

        $booking = Booking::find($id);
        $nbDays = Carbon::createFromFormat("Y-m-d", $booking->checkout)->diffInDays($newCheckout);
        $total = $nbDays * $newNightPrice;

        //generate signature
        $signaturePath = $booking->getFirstMedia("signature")?->getPath();
        $signatureBase64 = null;
        if (!empty($signaturePath)) {
            try {
                $signatureData = base64_encode(file_get_contents($signaturePath));
                $signatureMimeType = mime_content_type($signaturePath);
                $signatureBase64 = "data:{$signatureMimeType};base64,{$signatureData}";
            } catch (Throwable $th) {
                $signatureBase64 = null;
            }
        }
        //generate logo
        $agence = User::where("agence", "1")->first();
        $logoPath = $agence->getFirstMedia("profile_photo")?->getPath();
        $logoBase64 = null;
        if (!empty($logoPath)) {
            try {
                $logoData = base64_encode(file_get_contents($logoPath));
                $logoMimeType = mime_content_type($logoPath);
                $logoBase64 = "data:{$logoMimeType};base64,{$logoData}";
            } catch (Throwable $th) {
                $logoBase64 = null;
            }
        }

        try {
            $oldCheckout = $booking->checkout;
            $oldTotal = $booking->amount;

            $booking->checkout = $newCheckout;
            $booking->night_price = ($newNightPrice + $booking->night_price) / 2;
            $booking->amount = $booking->amount + $total;
            $booking->nb_days = $booking->nb_days + $nbDays;
            $booking->save();

            //generate private contract
            $mpdfPrivate = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'P',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 20,
                'margin_bottom' => 20,
                'autoScriptToLang' => true,
                'autoLangToFont' => true,
            ]);

            $htmlPrivatePdf = view("pdf.contract", [
                'signature' => $signatureBase64,
                'logo' => $logoBase64,
                'booking' => $booking,
                'agence' => $agence,
                'manager' => $manager,
                "isPrivate" => true,
                "type" => "extend",
                "oldCheckout" => $oldCheckout,
                "oldTotal" => $oldTotal
            ])->render();

            $mpdfPrivate->WriteHTML($htmlPrivatePdf);
            $privateContract = $mpdfPrivate->Output("", "S");


            //generate public contract


            $mpdfPublic = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'P',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 20,
                'margin_bottom' => 20,
                'autoScriptToLang' => true,
                'autoLangToFont' => true,
            ]);

            $htmlPublicPdf = view("pdf.contract", [
                'signature' => $signatureBase64,
                'logo' => $logoBase64,
                'booking' => $booking,
                'agence' => $agence,
                'manager' => $manager,
                "isPrivate" => false,
                "type" => "extend",
                "oldCheckout" => $oldCheckout,
                "oldTotal" => $oldTotal
            ])->render();

            $mpdfPublic->WriteHTML($htmlPublicPdf);
            $publicContract = $mpdfPublic->Output("", "S");

            $booking->addMediaFromString($privateContract)
                ->usingFileName('contract-pr-' . time() . '.pdf')
                ->toMediaCollection("contract-private");

            $booking->addMediaFromString($publicContract)
                ->usingFileName('contract-pb-' . time() . '.pdf')
                ->toMediaCollection("contract-public");


            $wa = new WasenderClient(config("services.whatsapp.wasender_key"));

            ///send message to client
            $client = $booking->client;
            $clientPhone = str_replace("+", "", $client->tel);
            if (!empty($clientPhone)) {
                try {
                    $wa->sendDocument(
                        $clientPhone,
                        $booking->getFirstMediaUrl("contract-private"),
                        "Your reservation has been extended as requested.✅تم تمديد حجزك حسب الطلب",
                        "bulletin_hebergement.pdf"
                    );
                } catch (Throwable $th) {
                    Log::error($th);
                }
            }




            $adminPhones = Manager::role("admin")->where("id", "!=", $manager->id)->get()->map(function ($admin) {
                return str_replace("+", "", $admin->phone);
            });

            $booking->refresh();




            foreach ($adminPhones as $phone) {
                if (!empty($phone)) {
                    try {
                        $wa->sendDocument(
                            $phone,
                            $booking->getFirstMediaUrl("contract-private"),
                            "La réservation a été mise à jour. Elle a été prolongée.",
                            "bulletin_hebergement.pdf"
                        );
                    } catch (Throwable $th) {
                        Log::error($th);
                    }
                }
            }


            DB::commit();
            return $this->successResponse(null);
        } catch (Throwable $th) {
            DB::rollBack();
            Log::error($th);
            return $this->serverErrorResponse($th->getMessage());
        }
    }

    public function shrink(Request $request, $id)
    {
        $manager = $request->user();
        $booking = Booking::findOrFail($id);
        $newCheckout = Carbon::parse($request->input("checkout"));
        $checkin = Carbon::parse($booking->checkin);
        $refundedPrice = $request->input("refundPrice");

        //generate signature
        $signaturePath = $booking->getFirstMedia("signature")?->getPath();
        $signatureBase64 = null;
        if (!empty($signaturePath)) {
            try {
                $signatureData = base64_encode(file_get_contents($signaturePath));
                $signatureMimeType = mime_content_type($signaturePath);
                $signatureBase64 = "data:{$signatureMimeType};base64,{$signatureData}";
            } catch (Throwable $th) {
                $signatureBase64 = null;
            }
        }
        //generate logo
        $agence = User::where("agence", "1")->first();
        $logoPath = $agence->getFirstMedia("profile_photo")?->getPath();
        $logoBase64 = null;
        if (!empty($logoPath)) {
            try {
                $logoData = base64_encode(file_get_contents($logoPath));
                $logoMimeType = mime_content_type($logoPath);
                $logoBase64 = "data:{$logoMimeType};base64,{$logoData}";
            } catch (Throwable $th) {
                $logoBase64 = null;
            }
        }


        DB::beginTransaction();
        try {
            $oldTotal = $booking->amount;
            $oldCheckout = $booking->checkout;

            $booking->update([
                "checkout" => $newCheckout,
                "amount" => $oldTotal - $refundedPrice,
                "nb_days" => $checkin->diffInDays($newCheckout)
            ]);


            //generate private contract
            $mpdfPrivate = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'P',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 20,
                'margin_bottom' => 20,
                'autoScriptToLang' => true,
                'autoLangToFont' => true,
            ]);

            $htmlPrivatePdf = view("pdf.contract", [
                'signature' => $signatureBase64,
                'logo' => $logoBase64,
                'booking' => $booking,
                'agence' => $agence,
                'manager' => $manager,
                "isPrivate" => true,
                "type" => "shrink",
                "oldCheckout" => $oldCheckout,
                "oldTotal" => $oldTotal
            ])->render();

            $mpdfPrivate->WriteHTML($htmlPrivatePdf);
            $privateContract = $mpdfPrivate->Output("", "S");


            //generate public contract

            $mpdfPublic = new Mpdf([
                'mode' => 'utf-8',
                'format' => 'A4',
                'orientation' => 'P',
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 20,
                'margin_bottom' => 20,
                'autoScriptToLang' => true,
                'autoLangToFont' => true,
            ]);

            $htmlPublicPdf = view("pdf.contract", [
                'signature' => $signatureBase64,
                'logo' => $logoBase64,
                'booking' => $booking,
                'agence' => $agence,
                'manager' => $manager,
                "isPrivate" => false,
                "type" => "shrink",
                "oldCheckout" => $oldCheckout,
                "oldTotal" => $oldTotal
            ])->render();

            $mpdfPublic->WriteHTML($htmlPublicPdf);
            $publicContract = $mpdfPublic->Output("", "S");

            $booking->addMediaFromString($privateContract)
                ->usingFileName('contract-pr-' . time() . '.pdf')
                ->toMediaCollection("contract-private");

            $booking->addMediaFromString($publicContract)
                ->usingFileName('contract-pb-' . time() . '.pdf')
                ->toMediaCollection("contract-public");



            $client = $booking->client;
            $clientPhone = str_replace("+", "", $client->tel);

            $adminPhones = Manager::role("admin")->where("id", "!=", $manager->id)->get()->map(function ($admin) {
                return str_replace("+", "", $admin->phone);
            });

            $booking->refresh();

            $wa = new WasenderClient(config("services.whatsapp.wasender_key"));
            if (!empty($clientPhone)) {
                try {
                    $wa->sendDocument(
                        $clientPhone,
                        $booking->getFirstMediaUrl("contract-private"),
                        "Your reservation has been updated. It has been shortened as requested.✅تم تحديث حجزك. لقد تم تقصيره حسب الطلب",
                        "bulletin_hebergement.pdf"
                    );
                } catch (Throwable $th) {
                    Log::error($th);
                }
            }

            foreach ($adminPhones as $phone) {
                if (!empty($phone)) {
                    try {
                        $wa->sendDocument(
                            $phone,
                            $booking->getFirstMediaUrl("contract-private"),
                            "La réservation a été mise à jour. Elle a été raccourcie.",
                            "bulletin_hebergement.pdf"
                        );
                    } catch (Throwable $th) {
                        Log::error($th);
                    }
                }
            }


            DB::commit();
            return $this->successResponse(null);
        } catch (Throwable $th) {
            DB::rollBack();
            Log::error($th);
            return $this->serverErrorResponse($th->getMessage());
        }
    }

    public function destroy(Request $request, $id)
    {
        Realstate::where("booking_id", $id)->update([
            "booking_id" => null
        ]);

        $booking = Booking::find($id);
        if ($booking) {
            $booking->delete();
        }
        return $this->successResponse(null);
    }
}
