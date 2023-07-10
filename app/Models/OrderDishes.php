<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDishes extends Model
{
    use HasFactory;
    use HasUuids;

    protected $table = 'orders_dish';
    protected $fillable = ['order_id', 'dish_id', 'menu_id'];

    public function get_dishes_for_order($order_id, $menu_id)
    {
        $dish = new Dish();
        $dishes = $this->where('order_id', $order_id)
            ->where('menu_id', $menu_id)
            ->with('dish')
            ->get()
            ->pluck('dish_id')
            ->toArray();
        return $dish->whereIn('id', $dishes)->get();
    }

    public function add_dishes_to_order($order_id, $menu_id, $dishes)
    {
        foreach ($dishes as $dish_id) {
            $this->create([
                'order_id' => $order_id,
                'menu_id' => $menu_id,
                'dish_id' => $dish_id,
            ]);
        }
    }
}
