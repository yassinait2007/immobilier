<?php

namespace App\Http\Resources\DashboardResource;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChargeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "note" => $this->note,
            "amount" => $this->amount,
            "status" => $this->status,
            "type" => $this->type,
            "document" => $this->document ? url('storage/' . $this->document) : null,
            "verificationDocument" => $this->verification_document ? url('storage/' . $this->verification_document) : null,
            "createdAt" => $this->created_at,
            "realestate" => new RealestateResource($this->realestate),

        ];
    }
}
