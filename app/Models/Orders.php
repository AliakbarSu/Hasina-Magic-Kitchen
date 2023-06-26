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

    public function items()
    {
        return $this->hasMany(ItemsOrder::class, 'order_id');
    }

    public function mark_as_paid($id)
    {
        $order = Orders::find($id);
        $order->status = "paid";
        $order->save();
    }
}
