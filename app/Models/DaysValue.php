<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DaysValue extends Model
{
    use HasFactory;

    protected $fillable = ['day', 'value', 'matching_discount_id', 'opposite_discount_id'];

    protected $with = ['matchingDiscount', 'oppositeDiscount'];

    public function matchingDiscount(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(DiscountList::class, 'matching_discount_id');
    }

    public function oppositeDiscount(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(DiscountList::class, 'opposite_discount_id');
    }
}
