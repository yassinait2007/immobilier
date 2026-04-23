<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource\ScheduledChargeResource;
use App\Models\ScheduledCharge;
use App\utils\JsonResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ScheduledChargeController extends Controller
{
    use JsonResponses;

    public function index(Request $request)
    {
        $realestate = $request->input("realestate");
        $type = $request->input("type");

        $charges = ScheduledCharge::with("realestate")
            ->when($realestate, function ($query) use ($realestate) {
                $query->where("realestate_id", $realestate);
            })
            ->when($type && $type != 'all', function ($query) use ($type) {
                $query->where("type", $type);
            })
            ->orderBy("created_at", "desc")
            ->get();
            
        $response = ScheduledChargeResource::collection($charges);
        return $this->successResponse($response);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name" => ["required", "string"],
            "description" => ["nullable", "string"],
            "amount" => ["required", "numeric"],
            "type" => ["nullable", "string", "in:fixed,variable"],
            "recurrence_type" => ["required", "string"], // weekly, monthly, yearly
            "recurrence_value" => ["nullable", "string"],
            "realestate" => ["required", "exists:realstates,id"]
        ]);

        if ($validator->fails()) {
            return $this->validationErrorResponse($validator->errors());
        }

        $data = $validator->validated();
        $data["realestate_id"] = $data["realestate"];
        $data["type"] = isset($data["type"]) ? $data["type"] : "fixed";
        
        $charge = ScheduledCharge::create($data);

        $response = new ScheduledChargeResource($charge);
        
        return $this->createdResponse($response);
    }

    public function destroy($id)
    {
        $charge = ScheduledCharge::findOrFail($id);
        $charge->delete();
        return $this->successResponse(null, "Deleted successfully");
    }
}
