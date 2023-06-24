<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DishMenu extends Model
{
    protected $table = "dish_menu";
    use HasFactory;
    protected $fillable = ['menu_id', 'dish_id'];
}
