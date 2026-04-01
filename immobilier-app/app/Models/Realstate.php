<?php

namespace App\Models;

use App\Filters\RealestateFilter;
use App\Models\Scopes\NotDeletedScope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Realstate extends Model implements HasMedia
{
    use InteractsWithMedia;
    protected $fillable = [
        'title',
        'description',
        'surface',
        'price',
        'address',
        'date_construction',
        'nb_etage',
        'nb_rooms',
        'etage',
        'nb_bathroom',
        'rate',
        'nb_raters',
        'latitude',
        'longitude',
        'category_id',
        'transaction_id',
        'owner_id',
        'host_id',
        'status_id',
        'review_status_id',
        'city_id',
        'etat_id',
        'is_deleted',
        "tour_360_url",
        "cleaning_status",
        "booking_id"
    ];
    protected $casts = [
        'surface' => 'integer',
        'price' => 'double',
        'nb_etage' => 'integer',
        'nb_rooms' => 'integer',
        'etage' => 'integer',
        'nb_bathroom' => 'integer',
        'rate' => 'double',
        'nb_raters' => 'integer',
        'latitude' => 'double',
        'longitude' => 'double',
    ];

    protected static function booted()
    {
        static::addGlobalScope(new NotDeletedScope());
    }

    public function scopeFilter(Builder $builder, RealestateFilter $filters)
    {
        return $filters->filter($builder);
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('images');
        $this->addMediaCollection('rapport');
    }

    public function host()
    {
        return $this->belongsTo(User::class, "host_id");
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class, "realestate_feature", "realstate_id", "feature_id");
    }

    public function etat()
    {
        return $this->belongsTo(RealstateEtat::class);
    }
    public function status()
    {
        return $this->belongsTo(RealstateStatus::class);
    }
    public function reviewStatus()
    {
        return $this->belongsTo(RealstateReviewStatus::class);
    }
    public function type()
    {
        return $this->belongsTo(TypeTransaction::class, "transaction_id");
    }
    public function category()
    {
        return $this->belongsTo(RealstateCategory::class);
    }
    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, "realestate_id");
    }

    public function booking()
    {
        return $this->belongsTo(Booking::class, "booking_id");
    }

    public function owner()
    {
        return $this->belongsTo(Owner::class, "owner_id");
    }
}
