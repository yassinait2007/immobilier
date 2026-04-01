<?php

namespace App\Http\Resources\DashboardResource;

use App\Http\Resources\AppResources\BookingStatusResource;
use App\Http\Resources\AppResources\ClientProfileResource;
use App\Http\Resources\AppResources\ClientReviewResource;
use App\Http\Resources\AppResources\HostReviewResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BookingResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "amount" => $this->amount,
            "checkin" => $this->checkin,
            "checkout" => $this->checkout,
            "nbGuest" => $this->nb_guest,
            "isRatable" => $this->is_ratable,
            "nightPrice" => $this->night_price,
            "client" => new ClientProfileResource($this->whenLoaded("client")),
            "realestate" => new RealestateResource($this->whenLoaded("realestate")),
            "status" => new BookingStatusResource($this->whenLoaded("status")),
            "clientReview" => new ClientReviewResource($this->whenLoaded("clientReview")),
            "myReview" => new HostReviewResource($this->whenLoaded("hostReview")),
            "privateContract" => $this->getFirstMediaUrl("contract-private"),
            "publicContract" => $this->getFirstMediaUrl("contract-public"),
        ];
    }
}
