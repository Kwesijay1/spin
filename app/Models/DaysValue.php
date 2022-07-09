<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaysValue extends Model
{
    use HasFactory;

    protected $fillable = ['day', 'value'];
}
