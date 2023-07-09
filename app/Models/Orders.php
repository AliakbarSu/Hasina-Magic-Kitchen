<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Orders extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'customer_name',
        'customer_id',
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
        $orders = $this->with([
            'items' => ['menu', 'menu_items.dishes'],
            'customer',
            'addons' => ['items'],
        ])->get();
        return $orders->map(function ($order) {
            $order->items = $order->items->map(function ($item) {
                $item->dishes = $item->menu_items->map(function ($menu_item) {
                    return $menu_item->dishes;
                });
                $item->menu_item = [];
                return $item;
            });
            return $order;
        });
    }

    public function get_order_by_id(string $id)
    {
        $order = $this->with([
            'items' => ['menu', 'menu_items.dishes'],
            'customer',
            'addons' => ['items'],
        ])->find($id);
        $order->items = $order->items->map(function ($item) {
            $item->dishes = $item->menu_items->map(function ($menu_item) {
                return $menu_item->dishes;
            });
            $item->menu_item = [];
            $item->menu_items = [];
            $item->menu->media = Orders::add_media($item->menu);
            return $item;
        });
        return $order;
    }

    public function items()
    {
        return $this->hasMany(ItemsOrder::class, 'order_id', 'id');
    }

    public function addons()
    {
        return $this->hasMany(AddonsOrder::class, 'order_id', 'id');
    }

    public function customer()
    {
        return $this->BelongsTo(Customers::class);
    }

    public function mark_as_paid($id)
    {
        $order = Orders::find($id);
        $order->status = 'paid';
        $order->save();
    }

    // returns an array of dates that are not available for orders
    public function availability()
    {
        $orders = $this->all()
            ->where('date', '>=', date('today'))
            ->groupBy('date');
        $dates = [];
        foreach ($orders as $order) {
            $is_available = $order->count() < 1;
            if ($is_available) {
                continue;
            }
            $dates[] = [
                'date' => $order[0]->date,
                'available' => $is_available,
            ];
        }
        return $dates;
    }

    static function can_palce_order()
    {
        $orders = Orders::where('date', '=', date('today'))->get();
        return $orders->count() <= 3;
    }

    static function add_media($item)
    {
        return array_map(function ($media) {
            return [
                'id' => $media['id'],
                'url' => $media['file_url'],
            ];
        }, $item->fetchAllMedia()->toArray());
    }
}
