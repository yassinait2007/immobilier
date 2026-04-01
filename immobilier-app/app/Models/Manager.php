<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Manager extends Authenticatable
{
    use HasApiTokens, HasRoles, SoftDeletes;

    protected $fillable = [
        "first_name",
        "last_name",
        "fcm_token",
        "password",
        "email",
        "phone"
    ];
}
