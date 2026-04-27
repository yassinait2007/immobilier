<?php

namespace App\Http\Controllers\dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource\ClientResource;
use App\Mail\HostAcceptedMail;
use App\Mail\HostRefusedMail;
use App\Models\User;
use App\Models\UserType;
use App\utils\JsonResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class HostApplicationController extends Controller
{
    use JsonResponses;

    public function index()
    {
        $applications = User::where("identity_status", "pending")
            ->whereHas("type", function ($query) {
                $query->where("code", "client");
            })->get();
            
        return $this->successResponse(ClientResource::collection($applications));
    }

    public function accept($id)
    {
        $user = User::findOrFail($id);
        $hostType = UserType::where("code", "host")->first();
        
        $user->update([
            "identity_status" => "valid",
            "type_id" => $hostType->id
        ]);

        try {
            Mail::to($user->email)->send(new HostAcceptedMail($user));
        } catch (\Exception $e) {
            \Log::error('Failed to send host acceptance email: ' . $e->getMessage());
        }

        return $this->successResponse(new ClientResource($user->fresh()));
    }

    public function refuse($id)
    {
        $user = User::findOrFail($id);
        
        $user->update([
            "identity_status" => "refused"
        ]);

        try {
            Mail::to($user->email)->send(new HostRefusedMail($user));
        } catch (\Exception $e) {
            \Log::error('Failed to send host refusal email: ' . $e->getMessage());
        }

        return $this->successResponse(new ClientResource($user->fresh()));
    }
}
