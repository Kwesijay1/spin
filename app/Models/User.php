<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type_id',
        'phone_number',
        'token',
        'facebook_app_id',
        'facebook_page_id',
        'position_id',
        'constituency_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $with = ['userType'];

    protected $appends = ['initials'];

    public function userType(){
        return $this->belongsTo(UserType::class);
    }

    public function expectations(){
        return $this->hasMany(Expectation::class);
    }
    public function donation(){
        return $this->hasMany(Donation::class);
    }
    public function getInitialsAttribute(){
        $nameArray = explode(' ', $this->name);
        $first = $nameArray[0];
        $last = $nameArray[count($nameArray)-1];
        return $first[0] .''. $last[0];
    }
}
