<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiscountList extends Model
{
    use HasFactory;

    protected $fillable = ['rate', 'color', 'bg_color'];

    protected $appends = ['name'];

    public function getNameAttribute(){
        return $this->rate.'%';
    }
}
