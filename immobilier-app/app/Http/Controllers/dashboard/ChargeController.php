<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource\ChargeResource;
use App\Models\Charge;
use App\utils\JsonResponses;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChargeController extends Controller
{

    use JsonResponses;


    public function index(Request $request)
    {
        $from = $request->input("from");
        $to = $request->input("to");
        $realestate = $request->input("realestate");
        $status = $request->input("status");
        $type = $request->input("type");

        $charges = Charge::with("realestate")
            ->when($realestate, function ($query) use ($realestate) {
                $query->where("realestate_id", $realestate);
            })
            ->when($status && $status != 'all', function ($query) use ($status) {
                $query->where("status", $status);
            })
            ->when($type && $type != 'all', function ($query) use ($type) {
                $query->where("type", $type);
            })
            ->when($from && $to, function ($query) use ($from, $to) {
                $dtFrom = Carbon::parse($from)->startOfDay();
                $dtTo = Carbon::parse($to)->endOfDay();
                $query->where("created_at", ">=", $dtFrom)
                    ->where("created_at", "<=", $dtTo);
            })->orderBy("created_at", "desc")
            ->get();
        $response = ChargeResource::collection($charges);
        return $this->successResponse($response);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => ["required", "string"],
            "note" => ["nullable", "string"],
            "amount" => ["required", "numeric"],
            "document" => ["nullable", "file", "max:10240"], // Max 10MB
            "status" => ["nullable", "string", "in:pending,paid,cancelled"],
            "type" => ["nullable", "string", "in:fixed,variable"],
            "realestate" => ["nullable", "exists:realstates,id"]
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $data = $validator->validated();
        $data["realestate_id"] = isset($data["realestate"]) ? $data["realestate"] : null;
        $data["status"] = isset($data["status"]) ? $data["status"] : "pending";
        $data["type"] = isset($data["type"]) ? $data["type"] : "fixed";

        if ($request->hasFile('document')) {
            $data['document'] = $request->file('document')->store('charges', 'public');
        }

        $charge = Charge::create($data);
        $response = new ChargeResource($charge);
        return $this->createdResponse($response);
    }

    public function validateCharge(Request $request, $id)
    {
        $charge = Charge::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            "verification_document" => ["nullable", "file", "max:10240"], // Max 10MB
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        if ($request->hasFile('verification_document')) {
            $charge->verification_document = $request->file('verification_document')->store('charges/validation', 'public');
        }
        
        $charge->status = 'paid';
        $charge->save();

        return $this->successResponse(new ChargeResource($charge), "Charge validée avec succès");
    }

    public function cancelCharge($id)
    {
        $charge = Charge::findOrFail($id);
        $charge->status = 'cancelled';
        $charge->save();
        return $this->successResponse(new ChargeResource($charge), "Charge annulée avec succès");
    }


    public function destroy($id)
    {
        $charge = Charge::findOrFail($id);
        if ($charge->document) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($charge->document);
        }
        $charge->delete();
        return $this->successResponse(null, "Deleted successfully");
    }
}
