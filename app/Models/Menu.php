<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;
    use HasUuids;
    
    protected $fillable = [
        "name",
        "description",
        "price",

    ];

    public function dishes()
    {
        return $this->belongsToMany(Dish::class, "dish_menu" );
    }

    public function options()
    {
        return $this->belongsToMany(Dish::class, "menu_options");
    }
}
