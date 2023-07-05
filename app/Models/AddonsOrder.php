<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AddonsOrder extends Model
{
    use HasFactory;
    use HasUuids;
    protected $fillable = ['order_id', 'dish_id', 'quantity'];
    protected $hidden = ['dish_id', 'order_id'];

    public function items()
    {
        return $this->hasMany(Dish::class, 'id', 'dish_id');
    }

    public function order()
    {
        return $this->belongsTo(Orders::class, 'order_id');
    }
}
