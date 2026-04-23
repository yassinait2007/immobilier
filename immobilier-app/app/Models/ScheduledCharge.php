<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduledCharge extends Model
{
    protected $fillable = [
        'name',
        'description',
        'amount',
        'type',
        'recurrence_type',
        'recurrence_value',
        'realestate_id'
    ];

    public function realestate()
    {
        return $this->belongsTo(Realstate::class, 'realestate_id');
    }
}
