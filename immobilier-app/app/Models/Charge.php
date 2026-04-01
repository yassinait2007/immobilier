<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Charge extends Model
{

    protected $fillable = [
        "name",
        "note",
        "amount",
        "document",
        "realestate_id"
    ];


    public function realestate()
    {
        return $this->belongsTo(Realstate::class, "realestate_id");
    }
}
