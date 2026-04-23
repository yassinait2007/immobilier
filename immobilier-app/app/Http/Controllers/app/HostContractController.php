<?php

namespace App\Http\Controllers\app;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource\ContractResource;
use App\Models\Contract;
use App\Models\ScheduledCharge;
use App\utils\JsonResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class HostContractController extends Controller
{
    use JsonResponses;

    public function index(Request $request)
    {
        $user = $request->user();
        $realestateId = $request->input("realestate_id");
        
        $contracts = Contract::with(['media', "owner", "client", "realestate"])
            ->whereHas("realestate", function ($query) use ($user) {
                $query->where("host_id", $user->id);
            })
            ->when($realestateId, function ($query) use ($realestateId) {
                $query->where("realestate_id", $realestateId);
            })
            ->orderBy("signed_date", "desc")
            ->get();

        $response = ContractResource::collection($contracts);
        return $this->jsonResponse(true, self::SUCCESS, 200, $response);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'note' => ['nullable', 'string'],
            'signedDate' => ['required', 'date'],
            'expirationDate' => ['required', 'date'],
            'realestate_id' => ['required', 'exists:realstates,id'],
            'document' => ['nullable', 'file', 'mimes:jpeg,png,pdf,jpg', 'max:5120'],
            'price' => ['nullable', 'numeric'],
            'type' => ['required', 'string', 'in:client,owner']
        ]);

        if ($validator->fails()) {
            return $this->jsonResponse(false, self::VALIDATION_ERROR, 422, $validator->errors());
        }

        $data = $validator->validated();
        
        // Security check: ensure host owns the realestate
        $realestate = \App\Models\Realstate::where("id", $data['realestate_id'])
            ->where("host_id", $user->id)
            ->first();
            
        if (!$realestate) {
            return $this->jsonResponse(false, "Unauthorized", 403, null);
        }

        try {
            DB::beginTransaction();
            
            $contractData = [
                'note' => $data['note'] ?? null,
                'realestate_id' => $data['realestate_id'],
                'signed_date' => $data['signedDate'],
                'expiration_date' => $data['expirationDate'],
                'price' => $data['price'] ?? 0,
                'type' => $data['type'],
                // For host-created contracts, the owner is usually linked to the realestate
                'owner_id' => $realestate->owner_id,
            ];

            $contract = Contract::create($contractData);
            
            if ($request->hasFile('document')) {
                $contract->addMedia($request->file('document'))->toMediaCollection('documents');
            }

            // Automated creation of monthly charge if contract is for an owner
            if ($contract->type === 'owner' && $contract->price > 0) {
                ScheduledCharge::create([
                    'name' => "Commission de Gestion - " . ($realestate->title),
                    'description' => "Charge automatique générée par le contrat de gestion",
                    'amount' => $contract->price,
                    'type' => 'fixed',
                    'recurrence_type' => 'monthly',
                    'recurrence_value' => '1',
                    'realestate_id' => $contract->realestate_id,
                ]);
            }

            DB::commit();
            return $this->jsonResponse(true, self::SUCCESS, 201, new ContractResource($contract->load(['media', 'realestate', 'owner'])));
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->jsonResponse(false, "Error creating contract", 500, $e->getMessage());
        }
    }
}
