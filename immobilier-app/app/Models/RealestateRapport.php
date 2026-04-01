<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class RealestateRapport extends Model implements HasMedia
{
    use InteractsWithMedia;


    protected $fillable = [
        "name",
        "description",
        "date",
        "realestate_id"
    ];
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
    }
}
