<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;
    use HasUuids;
    
    protected $fillable = [
        'customer_name',
        'email',
        'phone',
        'address',
        'date',
        'time',
        'note',
        'total',
        'status',
    ];

    public function all_orders()
    {
        $orders = $this->with(["items" => ["menu", "menu_items.dishes"]])->get();
        return $orders->map(function($order) {
            $order->items = $order->items->map(function($item) {
                $item->dishes = $item->menu_items->map(function($menu_item) {
                    return $menu_item->dishes;
                });
                $item->menu_item = [];
                return $item;
            });
            return $order;
        });
        
    }

    public function items()
    {
        return $this->hasMany(ItemsOrder::class, 'order_id', 'id');
    }

    public function mark_as_paid($id)
    {
        $order = Orders::find($id);
        $order->status = "paid";
        $order->save();
    }

    // returns an array of dates that are not available for orders
    public function availability()
    {
        $orders = $this->all()->where("date", ">=", date('today'))->groupBy('date');
        $dates = [];
        foreach($orders as $order) {
            $is_available = $order->count() < 1;
            if($is_available) {
                continue;
            }
            $dates[] = ["date" => $order[0]->date, "available" => $is_available];
        }
        return $dates;
    }
}
