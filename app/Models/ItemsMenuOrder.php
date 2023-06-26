<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemsMenuOrder extends Model
{
    use HasFactory;
    protected $fillable = [
        'item_id',
        'dish_id'
    ];

    public function dishes()
    {
        return $this->hasMany(Dish::class, 'id', 'dish_id');
    }

    protected $hidden = [
        'id',
        'item_id',
        'dish_id',
        'created_at',
        'updated_at',
    ];
}
