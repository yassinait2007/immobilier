<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Slider extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $fillable = [
        "name",
        "description",
        "is_active"
    ];
    protected $casts = [
        "is_active" => "boolean"
    ];
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
    }
}
