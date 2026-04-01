<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaginationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $paginator = $this->resource;

        // If we are wrapping a ResourceCollection, the underlying paginator is in its resource property
        if ($this->resource instanceof \Illuminate\Http\Resources\Json\AnonymousResourceCollection || $this->resource instanceof \Illuminate\Http\Resources\Json\ResourceCollection) {
            $paginator = $this->resource->resource;
        }

        return  [
            "items" => $this->resource,
            'pagination' => [
                'total'         => $paginator->total(),
                'per_page'      => $paginator->perPage(),
                'current_page'  => $paginator->currentPage(),
                'last_page'     => $paginator->lastPage(),
                'from'          => $paginator->firstItem(),
                'to'            => $paginator->lastItem()
            ]
        ];
    }
}
