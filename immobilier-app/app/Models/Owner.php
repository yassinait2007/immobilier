<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Owner extends Model
{
    protected $fillable = [
        "name",
        "email",
        "tel",
        "address"
    ];


    public function realestates(){
        return $this->hasMany(Realstate::class,"owner_id");
    }


}
