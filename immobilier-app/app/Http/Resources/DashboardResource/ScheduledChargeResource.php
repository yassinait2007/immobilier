<?php

namespace App\Http\Resources\DashboardResource;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduledChargeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "amount" => $this->amount,
            "type" => $this->type,
            "recurrenceType" => $this->recurrence_type,
            "recurrenceValue" => $this->recurrence_value,
            "createdAt" => $this->created_at,
            "realestate" => new RealestateResource($this->realestate),

        ];
    }
}
