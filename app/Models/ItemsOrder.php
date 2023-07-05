<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemsOrder extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = ['order_id', 'menu_id', 'quantity'];

    public function menu_items()
    {
        return $this->hasMany(ItemsMenuOrder::class, 'item_id');
    }

    public function menu()
    {
        return $this->hasOne(Menu::class, 'id', 'menu_id');
    }

    protected $hidden = [
        'id',
        'order_id',
        'menu_id',
        'created_at',
        'updated_at',
    ];

    // public function addons()
    // {
    //     return $this->hasMany(Dish::class, 'dish_id');
    // }

    public function order()
    {
        return $this->belongsTo(Orders::class, 'order_id');
    }
}
