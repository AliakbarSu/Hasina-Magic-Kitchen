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
            'items' => ['dishes', 'order_dishes'],
            'customer',
            'addons',
        ])->get();
        return $orders->map(function ($order) {
            $order->items = $order->items->transform(function ($item, $order) {
                $item->quantity = $item->pivot->quantity;
                $item->media = Orders::add_media($item);
                $item->makeHidden('pivot');
                $item->dishes->each(function ($dish) {
                    $dish->makeHidden('pivot');
                    $dish->media = Orders::add_media($dish);
                });
                $order_dishes = $item
                    ->order_dishes()
                    ->where('order_id', '=', $item->pivot->orders_id)
                    ->get();

                $order_dishes->each(function ($dish) {
                    $dish->makeHidden('pivot');
                    $dish->media = Orders::add_media($dish);
                });
                return [...$item->toArray(), 'order_dishes' => $order_dishes];
            });
            $order->addons->each(function ($addon) {
                $addon->makeHidden('pivot');
                $addon->media = Orders::add_media($addon);
            });
            return $order;
        });
    }

    public function get_order_by_id(string $id)
    {
        $order = $this->all_orders()->find($id);
        return $order;
    }

    public function items()
    {
        return $this->belongsToMany(Menu::class)->withPivot('quantity');
    }

    public function addons()
    {
        return $this->belongsToMany(Dish::class)->withPivot('quantity');
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
