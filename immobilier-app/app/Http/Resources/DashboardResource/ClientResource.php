<?php

namespace App\Http\Resources\DashboardResource;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "firstName" => $this->first_name,
            "lastName" => $this->last_name,
            "email" => $this->email,
            "tel" => $this->tel,
            "type" => $this->type->code,
            "documentsProvided" => isset($this->documents) ? explode(";", $this->documents) : null,
            "profile" => $this->getFirstMediaUrl('profile_photo'),
            "bookings" => BookingResource::collection($this->whenLoaded("bookings")),
            "documents" => $this->getMedia("documents")->map(function ($item) {
                return [
                    "id" => $item["id"],
                    "url" => $item["original_url"]
                ];
            })
        ];
    }
}
