<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource\ScheduledChargeResource;
use App\Models\ScheduledCharge;
use App\utils\JsonResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HostScheduledChargeController extends Controller
{
    use JsonResponses;

    public function index(Request $request)
    {
        $user = $request->user();
        $realestateId = $request->input("realestate_id");

        $charges = ScheduledCharge::with('realestate')
            ->whereHas("realestate", function ($query) use ($user) {
                $query->where("host_id", $user->id);
            })
            ->when($realestateId, function ($query) use ($realestateId) {
                $query->where("realestate_id", $realestateId);
            })
            ->orderBy("created_at", "desc")
            ->get();

        return $this->jsonResponse(true, self::SUCCESS, 200, ScheduledChargeResource::collection($charges));
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'amount' => ['required', 'numeric'],
            'type' => ['required', 'in:fixed,variable'],
            'recurrenceType' => ['required', 'in:monthly,weekly,daily'],
            'recurrenceValue' => ['required', 'string'],
            'realestate_id' => ['required', 'exists:realstates,id'],
        ]);

        if ($validator->fails()) {
            return $this->jsonResponse(false, self::VALIDATION_ERROR, 422, $validator->errors());
        }

        $data = $validator->validated();

        // Check ownership
        $realestate = \App\Models\Realstate::where("id", $data['realestate_id'])
            ->where("host_id", $user->id)
            ->first();

        if (!$realestate) {
            return $this->jsonResponse(false, "Unauthorized", 403, null);
        }

        $charge = ScheduledCharge::create([
            'name' => $data['name'],
            'description' => $data['description'] ?? null,
            'amount' => $data['amount'],
            'type' => $data['type'],
            'recurrence_type' => $data['recurrenceType'],
            'recurrence_value' => $data['recurrenceValue'],
            'realestate_id' => $data['realestate_id'],
        ]);
        
        return $this->jsonResponse(true, self::SUCCESS, 201, new ScheduledChargeResource($charge));
    }
}
