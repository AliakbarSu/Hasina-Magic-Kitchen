<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Notifications\NewOrder;
use App\Notifications\OrderPlaced;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function orders(Orders $orders)
    {
        return Inertia::render('Admin/Orders', [
            'orders' => $orders->all_orders()->sortBy('created_at'),
        ]);
    }

    public function order_details(
        Request $request,
        OrdersController $ordersController,
        Orders $orders
    ) {
        return Inertia::render('Admin/OrderDetails', [
            'order' => $ordersController->find_order($request->id, $orders),
        ]);
    }

    public function update_order_status(Request $request, Orders $orders)
    {
        if (!$request->order_id || !$request->status) {
            return redirect()->back();
        }
        $order = $orders->find($request->order_id);
        $order->status = $request->status;
        $order->save();
        if ($order->status === 'confirm') {
            Notification::route('mail', $order->email)->notify(
                new OrderPlaced($order)
            );
        }
        return redirect()->back();
    }

    public function notifiy_new_order(Orders $order)
    {
        return Notification::route('mail', env('NOTIFICATION_EMAIL'))->notify(
            new NewOrder($order)
        );
    }
}
