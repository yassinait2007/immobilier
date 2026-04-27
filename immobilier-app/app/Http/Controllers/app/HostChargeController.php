<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource\ChargeResource;
use App\Models\Charge;
use App\utils\JsonResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HostChargeController extends Controller
{
    use JsonResponses;

    public function index(Request $request)
    {
        $user = $request->user();
        $realestateId = $request->input("realestate_id");

        $charges = Charge::with('realestate')
            ->whereHas("realestate", function ($query) use ($user) {
                $query->where("host_id", $user->id);
            })
            ->when($realestateId, function ($query) use ($realestateId) {
                $query->where("realestate_id", $realestateId);
            })
            ->orderBy("created_at", "desc")
            ->get();

        return $this->jsonResponse(true, self::SUCCESS, 200, ChargeResource::collection($charges));
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'], // Map to note
            'amount' => ['required', 'numeric'],
            'type' => ['required', 'in:fixed,variable'],
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

        $charge = Charge::create([
            'name' => $data['name'],
            'note' => $data['description'] ?? null,
            'amount' => $data['amount'],
            'type' => $data['type'],
            'realestate_id' => $data['realestate_id'],
            'status' => 'pending'
        ]);
        
        return $this->jsonResponse(true, self::SUCCESS, 201, new ChargeResource($charge));
    }

    public function validate(Request $request, $id)
    {
        $user = $request->user();
        $charge = Charge::where("id", $id)
            ->whereHas("realestate", function ($query) use ($user) {
                $query->where("host_id", $user->id);
            })
            ->first();

        if (!$charge) {
            return $this->jsonResponse(false, self::NOT_FOUND, 404, null);
        }

        $charge->status = 'paid';
        $charge->save();

        return $this->jsonResponse(true, self::SUCCESS, 200, new ChargeResource($charge));
    }

    public function cancel(Request $request, $id)
    {
        $user = $request->user();
        $charge = Charge::where("id", $id)
            ->whereHas("realestate", function ($query) use ($user) {
                $query->where("host_id", $user->id);
            })
            ->first();

        if (!$charge) {
            return $this->jsonResponse(false, self::NOT_FOUND, 404, null);
        }

        $charge->status = 'cancelled';
        $charge->save();

        return $this->jsonResponse(true, self::SUCCESS, 200, new ChargeResource($charge));
    }
}
