<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuOptions extends Model
{
    protected $table = "menu_options";
    use HasFactory;
    protected $fillable = ['menu_id', 'dish_id'];
}
