<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaysValue extends Model
{
    use HasFactory;

    protected $fillable = ['day', 'value', 'discount_list_id'];

    protected $with = ['discountList'];

    public function discountList(){
        return $this->belongsTo(DiscountList::class);
    }
}
