<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource\RealestateResource;
use App\Models\Booking;
use App\Models\Realstate;
use App\Models\RealstateCategory;
use App\Models\RealstateEtat;
use App\Models\RealstateReviewStatus;
use App\Models\RealstateStatus;
use App\Models\TypeTransaction;
use App\Models\User;
use App\Models\UserType;
use App\utils\JsonResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

use function Symfony\Component\Clock\now;

class RealestateController extends Controller
{


    use JsonResponses;

    // public function store(Request $request)
    // {
    //     $validator = Validator::make(
    //         $request->all(),
    //         [
    //             "title" => ["required", "string"],
    //             "description" => ["required", "string"],
    //             "price" => ["required", "numeric", "gt:0"],
    //             "surface" => ["required", "integer", "gt:0"],
    //             "address" => ["required", "string"],
    //             "dateConstruction" => ["nullable", "date_format:Y-m-d"],
    //             "nbEtages" => ["nullable", "integer"],
    //             "nbRooms" => ["nullable", "integer"],
    //             "etage" => ["nullable", "integer"],
    //             "nbBathrooms" => ["nullable", "integer"],
    //             "latitude" => ["required", "numeric"],
    //             "longitude" => ["required", "numeric"],
    //             "tour360Url" => ["nullable", "url:http,https"],
    //             "category" => ["required", "exists:realstate_categories,code"],
    //             "typeTransaction" => ["required", "exists:type_transactions,code"],
    //             "etat" => ["required", "exists:realstate_etats,code"],
    //             "city" => ["required", "exists:cities,id"],
    //             "features" => ["nullable", "array"],
    //             "features.*" => ["exists:features,id"],
    //             "images" => ["required", "array", "min:2", "max:10"],
    //             "owner" => ["nullable", "exists:owners,id"],
    //             "images.*" => ["image", "mimes:png,jpg,jpeg", "max:2048"]
    //         ]
    //     );
    //     if ($validator->fails()) {
    //         return $this->jsonResponse(false, self::VALIDATION_ERROR, 422, $validator->errors());
    //     }
    //     //create realestate
    //     $data = $validator->validated();
    //     $data["date_construction"] = isset($data["dateConstruction"]) ? $data["dateConstruction"] : null;
    //     $data["nb_etage"] = isset($data["nbEtages"]) ? $data["nbEtages"] : null;
    //     $data["nb_rooms"] = isset($data["nbRooms"]) ? $data["nbRooms"] : null;
    //     $data["nb_bathroom"] = isset($data["nbBathrooms"]) ? $data["nbBathrooms"] : null;
    //     $data["tour_360_url"] = isset($data["tour360Url"]) ? $data["tour360Url"] : null;
    //     $data["category_id"] = RealstateCategory::where("code", "=", $data["category"])->first()->id;
    //     $data["transaction_id"] = TypeTransaction::where("code", "=", $data["typeTransaction"])->first()->id;
    //     $data["etat_id"] = RealstateEtat::where("code", "=", $data["etat"])->first()->id;
    //     $data["city_id"] = $data["city"];
    //     $data["review_status_id"] = RealstateReviewStatus::where("code", "=", "legal")->first()->id;
    //     $data["status_id"] = RealstateStatus::where("code", "=", "active")->first()->id;
    //     $data["owner_id"] = $data["owner"];
    //     //get agence account
    //     $agence = User::where("agence", "=", "1")->first();
    //     $data["host_id"] = $agence->id;
    //     $realstate = Realstate::create($data);

    //     //add features to realestate
    //     $realstate->features()->attach($data["features"]);

    //     //add images
    //     $images = $request->file("images");
    //     for ($i = 0; $i < count($images); $i++) {
    //         $image = $images[$i];
    //         $ext = $image->getClientOriginalExtension();
    //         $fileName = ($i + 1) . "." . $ext;
    //         $realstate->addMedia($image)->usingFileName($fileName)->toMediaCollection("images");
    //     }
    //     //return realestate
    //     $response = new RealestateResource($realstate);
    //     return $this->jsonResponse(true, self::SUCCESS, 201, $response);
    // }



    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                "title" => ["required", "string"],
                "description" => ["required", "string"],
                "price" => ["required", "numeric", "gt:0"],
                "surface" => ["required", "integer", "gt:0"],
                "address" => ["required", "string"],
                "dateConstruction" => ["nullable", "date_format:Y-m-d"],
                "nbEtages" => ["nullable", "integer"],
                "nbRooms" => ["nullable", "integer"],
                "etage" => ["nullable", "integer"],
                "nbBathrooms" => ["nullable", "integer"],
                "latitude" => ["required", "numeric"],
                "longitude" => ["required", "numeric"],
                "tour360Url" => ["nullable", "url:http,https"],
                "category" => ["required", "exists:realstate_categories,code"],
                "typeTransaction" => ["required", "exists:type_transactions,code"],
                "etat" => ["required", "exists:realstate_etats,code"],
                "city" => ["required", "exists:cities,id"],
                "features" => ["nullable", "array"],
                "features.*" => ["exists:features,id"],
                "images" => ["required", "array", "min:2"],
                "owner" => ["nullable", "exists:owners,id"],
                "images.*" => ["image", "mimes:png,jpg,jpeg",]
            ]
        );

        if ($validator->fails()) {
            return $this->jsonResponse(false, self::VALIDATION_ERROR, 422, $validator->errors());
        }

        $data = $validator->validated();

        try {
            DB::beginTransaction();

            // Map data
            $data["date_construction"] = $data["dateConstruction"] ?? null;
            $data["nb_etage"] = $data["nbEtages"] ?? null;
            $data["nb_rooms"] = $data["nbRooms"] ?? null;
            $data["nb_bathroom"] = $data["nbBathrooms"] ?? null;
            $data["tour_360_url"] = $data["tour360Url"] ?? null;
            $data["category_id"] = RealstateCategory::where("code", $data["category"])->first()->id;
            $data["transaction_id"] = TypeTransaction::where("code", $data["typeTransaction"])->first()->id;
            $data["etat_id"] = RealstateEtat::where("code", $data["etat"])->first()->id;
            $data["city_id"] = $data["city"];
            $data["review_status_id"] = RealstateReviewStatus::where("code", "legal")->first()->id;
            $data["status_id"] = RealstateStatus::where("code", "active")->first()->id;
            $data["owner_id"] = $data["owner"] ?? null;
            $data["cleaning_status"] = "cleaned";

            // Host (agence) user
            $agence = User::where("agence", "1")->first();
            $data["host_id"] = $agence->id;

            // Create realestate
            $realstate = Realstate::create($data);

            // Attach features if provided
            if (!empty($data["features"])) {
                $realstate->features()->attach($data["features"]);
            }

            // Add images
            $images = $request->file("images");
            foreach ($images as $i => $image) {
                $ext = $image->getClientOriginalExtension();
                $fileName = ($i + 1) . "." . $ext;
                $realstate
                    ->addMedia($image)
                    ->usingFileName($fileName)
                    ->toMediaCollection("images");
            }

            DB::commit();

            $response = new RealestateResource($realstate);
            return $this->jsonResponse(true, self::SUCCESS, 201, $response);
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->jsonResponse(false, "Erreur lors de la création du bien immobilier", 500, [
                "error" => $e->getMessage()
            ]);
        }
    }


    public function index(Request $request)
    {
        $status = $request->input("status");
        $realestatesQuery = Realstate::with(["owner", "booking.client", "bookings", "city", "category", "type", "reviewStatus", "status", "etat", "features", "host"])->with([
            'bookings' => function ($q) {
                $q->whereDate('checkin', '>', today())
                    ->orderBy('checkin', 'asc');
            }
        ]);

        if ($status == "available") {
            $realestates = $realestatesQuery
                ->whereDoesntHave("booking")
                ->whereDoesntHave("bookings", function($q) {
                    $q->whereDate("checkin", ">=", today());
                })
                ->where(function($q) {
                    $q->where("cleaning_status", "cleaned")
                      ->orWhereNull("cleaning_status");
                })
                ->withCount([
                    "bookings as todayBookings" => function ($query) {
                        $query->whereDate("checkin", today());
                    }
                ])
                ->orderBy("created_at", "desc")
                ->get();
        } else if ($status == "reserved") {
            $realestates = $realestatesQuery
                ->where(function($q) {
                    $q->whereHas('booking')
                      ->orWhereHas('bookings', function($sq) {
                          $sq->whereDate('checkin', '>=', today());
                      });
                })
                ->orderBy("created_at", "desc")
                ->get();
        } else if ($status == "cleaning") {
            $realestates = $realestatesQuery
                ->whereDoesntHave("booking")
                ->where("cleaning_status", "cleaning")
                ->get();
        } else {
            $realestates = $realestatesQuery->get();
        }
        //get next checkin and fallback booking for display
        foreach ($realestates as $r) {
            $r->nextCheckin = $r->bookings->first()?->checkin;
            
            // If current booking is empty but we are in reserved view,
            // provide the upcoming booking for the UI
            if ($status == "reserved" && (!$r->relationLoaded('booking') || $r->booking == null)) {
                $r->setRelation('booking', $r->bookings->first());
            }
        }

        $response = RealestateResource::collection($realestates);
        return $this->jsonResponse(true, self::SUCCESS, 200, $response);
    }

    public function realestatesOverview(Request $request)
    {
        $realestatesQuery = Realstate::with(["owner", "booking.client", "bookings", "city", "category", "type", "reviewStatus", "status", "status", "etat", "features", "host"])
            ->orderBy("created_at", "desc");


        $allRealetstate = (clone $realestatesQuery)->count();

        $nbAvailable = (clone $realestatesQuery)
            ->whereDoesntHave("booking")
            ->whereDoesntHave("bookings", function($q) {
                $q->whereDate("checkin", ">=", today());
            })
            ->where(function($q) {
                $q->where("cleaning_status", "cleaned")
                  ->orWhereNull("cleaning_status");
            })
            ->count();

        $nbReserved = (clone $realestatesQuery)
            ->where(function($q) {
                $q->whereNotNull('booking_id')
                  ->orWhereHas('bookings', function($sq) {
                      $sq->whereDate('checkin', '>=', today());
                  });
            })->count();

        $nbCleaning = (clone $realestatesQuery)
            ->whereDoesntHave("booking")
            ->where("cleaning_status", "cleaning")
            ->count();

        $todayCheckout = (clone $realestatesQuery)->whereHas("booking", function ($query) {
            $query->where("checkout", "<=", now()->format("Y-m-d"));
        })->with([
            'bookings' => function ($q) {
                $q->whereDate('checkin', '>', today())
                    ->orderBy('checkin', 'asc');
            }
        ])->get();
        foreach ($todayCheckout as $r) {
            $r->nextCheckin = $r->bookings->first()?->checkin;
        }

        $realestateResponse = RealestateResource::collection($todayCheckout);

        $response = [
            "reserved" => $nbReserved,
            "available" => $nbAvailable,
            "cleaning" => $nbCleaning,
            "all" => $allRealetstate,
            "todayCheckout" => $realestateResponse
        ];

        return $this->successResponse($response);
    }

    public function confirmCheckin($id)
    {
        $realestate = Realstate::find($id);
        $booking = $realestate->bookings()->whereDate("checkin", today())->first();
        $realestate->booking_id = $booking->id;
        $realestate->save();
        return $this->successResponse(null);
    }

    public function confirmDepart($id)
    {
        $realestate = Realstate::find($id);
        $realestate->booking_id = null;
        $realestate->cleaning_status = "cleaning";
        $realestate->save();
        return $this->successResponse(null);
    }

    public function finishCleaning($id)
    {
        $realestate = Realstate::find($id);
        $realestate->cleaning_status = "cleaned";
        $realestate->save();
        return $this->successResponse(null);
    }



    public function show($id)
    {
        $realestate = Realstate::with(["owner", "bookings", "city", "category", "type", "reviewStatus", "status", "status", "etat", "features", "host"])->find($id);

        $reservedDates = $realestate->bookings()
            ->where("checkout", ">=", now())
            ->whereHas("status", function ($query) {
                $query->where("code", "=", "payed");
            })->orderBy("checkout", "asc")
            ->get()->map(function ($item) {
                return [
                    "checkin" => $item->checkin,
                    "checkout" => $item->checkout,
                ];
            });



        $response = (new RealestateResource($realestate))
            ->setReservedDates($reservedDates);

        return $this->successResponse($response);
    }










    // public function update(Request $request, $id)
    // {
    //     $realestate = Realstate::where("id", "=", $id)->first();
    //     $validator = Validator::make($request->all(), [
    //         "title" => ["sometimes", "string"],
    //         "description" => ["sometimes", "string"],
    //         "price" => ["sometimes", "numeric", "gt:0"],
    //         "surface" => ["sometimes", "integer", "gt:0"],
    //         "address" => ["sometimes", "string"],
    //         "dateConstruction" => ["sometimes", "date_format:Y-m-d"],
    //         "nbEtages" => ["sometimes", "integer"],
    //         "nbRooms" => ["sometimes", "integer"],
    //         "etage" => ["sometimes", "integer"],
    //         "nbBathrooms" => ["sometimes", "integer"],
    //         "latitude" => ["sometimes", "numeric"],
    //         "longitude" => ["sometimes", "numeric"],
    //         "tour360Url" => ["sometimes", "url:http,https"],
    //         "category" => ["sometimes", "exists:realstate_categories,code"],
    //         "typeTransaction" => ["sometimes", "exists:type_transactions,code"],
    //         "etat" => ["sometimes", "exists:realstate_etats,code"],
    //         "city" => ["sometimes", "exists:cities,id"],
    //         "features.*" => ["sometimes", "exists:features,id"],
    //         "trashImages" => ["sometimes", "array"],
    //         "owner" => ["sometimes", "exists:owners,id"],
    //         "trashImages.*" => ["sometimes", "integer"],
    //         "images" => ["sometimes", "array"],
    //         "images.*" => ["image", "mimes:png,jpg,jpeg", "max:2048"]
    //     ]);
    //     if ($validator->fails()) {
    //         return $this->jsonResponse(false, self::SUCCESS, 422, $validator->errors());
    //     }

    //     //update
    //     $data = $validator->validated();
    //     $data["date_construction"] = isset($data["dateConstruction"]) ? $data["dateConstruction"] : null;
    //     $data["nb_etage"] = isset($data["nbEtages"]) ? $data["nbEtages"] : null;
    //     $data["nb_rooms"] = isset($data["nbRooms"]) ? $data["nbRooms"] : null;
    //     $data["nb_bathroom"] = isset($data["nbBathrooms"]) ? $data["nbBathrooms"] : null;
    //     $data["tour_360_url"] = isset($data["tour360Url"]) ? $data["tour360Url"] : null;
    //     $data["category_id"] = RealstateCategory::where("code", "=", $data["category"])->first()->id;
    //     $data["transaction_id"] = TypeTransaction::where("code", "=", $data["typeTransaction"])->first()->id;
    //     $data["etat_id"] = RealstateEtat::where("code", "=", $data["etat"])->first()->id;
    //     $data["city_id"] = $data["city"];
    //     $data["review_status_id"] = RealstateReviewStatus::where("code", "=", "in-review")->first()->id;
    //     $data["status_id"] = RealstateStatus::where("code", "=", "pending")->first()->id;
    //     if (isset($data["owner"])) {
    //         $data["owner_id"] = $data["owner"];
    //     }

    //     $realestate->update($data);

    //     //update features
    //     if (isset($data['features'])) {
    //         $realestate->features()->sync($data['features']);
    //     }

    //     //add new images
    //     $newImages = $request->file("images");
    //     if ($newImages) {
    //         $start = $realestate->getMedia("images")->max("id");
    //         for ($i = 0; $i < count($newImages); $i++) {
    //             $image = $newImages[$i];
    //             $ext = $image->getClientOriginalExtension();
    //             $fileName = (++$start) . "." . $ext;
    //             $realestate->addMedia($image)->usingFileName($fileName)->toMediaCollection("images");
    //         }
    //     }
    //     //delete images

    //     if ($request->has("trashImages")) {
    //         foreach ($request->input("trashImages") as $imageId) {
    //             $realestate->getMedia("images")->where("id", "=", $imageId)->first()?->delete();
    //         }
    //     }

    //     $realestate->load(["city.region.country", "category", "type", "reviewStatus", "status", "etat", "features", "host"]);
    //     $realestate->unsetRelation('media');
    //     $realestate->loadMedia("images");
    //     $data = new RealestateResource($realestate);
    //     return $this->jsonResponse(true, self::SUCCESS, 200, $data);
    // }



    public function update(Request $request, $id)
    {
        $realestate = Realstate::where("id", "=", $id)->firstOrFail();

        $validator = Validator::make($request->all(), [
            "title" => ["sometimes", "string"],
            "description" => ["sometimes", "string"],
            "price" => ["sometimes", "numeric", "gt:0"],
            "surface" => ["sometimes", "integer", "gt:0"],
            "address" => ["sometimes", "string"],
            "dateConstruction" => ["sometimes", "date_format:Y-m-d"],
            "nbEtages" => ["nullable", "integer"],
            "nbRooms" => ["nullable", "integer"],
            "etage" => ["nullable", "integer"],
            "nbBathrooms" => ["nullable", "integer"],
            "latitude" => ["sometimes", "numeric"],
            "longitude" => ["sometimes", "numeric"],
            "tour360Url" => ["nullable", "url:http,https"],
            "category" => ["sometimes", "exists:realstate_categories,code"],
            "typeTransaction" => ["sometimes", "exists:type_transactions,code"],
            "etat" => ["sometimes", "exists:realstate_etats,code"],
            "city" => ["sometimes", "exists:cities,id"],
            "features" => ["nullable", "array"],
            "features.*" => ["exists:features,id"],
            "trashImages" => ["sometimes", "array"],
            "trashImages.*" => ["sometimes", "integer"],
            "owner" => ["nullable", "exists:owners,id"],
            "images" => ["sometimes", "array"],
            "images.*" => ["image", "mimes:png,jpg,jpeg"]
        ]);

        if ($validator->fails()) {
            return $this->jsonResponse(false, self::VALIDATION_ERROR, 422, $validator->errors());
        }

        $data = $validator->validated();

        try {
            DB::beginTransaction();

            // Map fields
            $data["date_construction"] = $data["dateConstruction"] ?? null;
            $data["nb_etage"] = $data["nbEtages"] ?? null;
            $data["nb_rooms"] = $data["nbRooms"] ?? null;
            $data["nb_bathroom"] = $data["nbBathrooms"] ?? null;
            $data["tour_360_url"] = $data["tour360Url"] ?? null;

            if (isset($data["category"])) {
                $data["category_id"] = RealstateCategory::where("code", $data["category"])->first()->id;
            }
            if (isset($data["typeTransaction"])) {
                $data["transaction_id"] = TypeTransaction::where("code", $data["typeTransaction"])->first()->id;
            }
            if (isset($data["etat"])) {
                $data["etat_id"] = RealstateEtat::where("code", $data["etat"])->first()->id;
            }
            if (isset($data["city"])) {
                $data["city_id"] = $data["city"];
            }

            if (isset($data["owner"])) {
                $data["owner_id"] = $data["owner"];
            }

            // Update base realestate
            $realestate->update($data);

            // Sync features if provided
            if (isset($data['features'])) {
                $realestate->features()->sync($data['features']);
            }

            // Add new images
            $newImages = $request->file("images");
            if ($newImages) {
                $start = $realestate->getMedia("images")->max("id") ?? 0;
                foreach ($newImages as $i => $image) {
                    $ext = $image->getClientOriginalExtension();
                    $fileName = (++$start) . "." . $ext;
                    $realestate
                        ->addMedia($image)
                        ->usingFileName($fileName)
                        ->toMediaCollection("images");
                }
            }

            // Delete images if requested
            if ($request->has("trashImages")) {
                foreach ($request->input("trashImages") as $imageId) {
                    $realestate->getMedia("images")->where("id", $imageId)->first()?->delete();
                }
            }

            DB::commit();

            // Reload relations
            $realestate->load([
                "city.region.country",
                "category",
                "type",
                "reviewStatus",
                "status",
                "etat",
                "features",
                "host"
            ]);
            $realestate->unsetRelation("media");
            $realestate->loadMedia("images");

            $data = new RealestateResource($realestate);
            return $this->jsonResponse(true, self::SUCCESS, 200, $data);
        } catch (\Throwable $e) {
            DB::rollBack();
            return $this->jsonResponse(false, "Erreur lors de la mise à jour du bien immobilier", 500, [
                "error" => $e->getMessage()
            ]);
        }
    }



    public function destroy(Request $request, $id)
    {
        $realestate = Realstate::where("id", "=", $id)->first();
        $realestate->is_deleted = 1;
        $realestate->save();
        return $this->jsonResponse(true, self::SUCCESS, 200, null);
    }

    public function addRapport(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            "rapoort" => ["required"]
        ]);
        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }
        $realestate = Realstate::find($id);
        $images = $request->file("images");
        foreach ($images as $img) {
            $realestate->addMedia($img)->toMediaCollection("rapport");
        }
        return $this->successResponse(null);
    }
}
