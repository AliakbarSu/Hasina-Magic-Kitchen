<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use App\Notifications\Contact;
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

    public function order_details(Request $request, Orders $orders)
    {
        return Inertia::render('Admin/OrderDetails', [
            'order' => $orders->get_order_by_id($request->id),
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
        Notification::route('mail', env('NOTIFICATION_EMAIL'))->notify(
            new NewOrder($order)
        );
    }

    public function contact(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|max:40|min:2',
            'last_name' => 'required|max:40|min:2',
            'email' => 'required|email',
            'company' => 'max:40',
            'number' => 'required|numeric',
            'message' => 'required|max:200',
            'terms' => 'required|accepted',
        ]);
        Notification::route('mail', env('NOTIFICATION_EMAIL'))->notify(
            new Contact($validated)
        );
        return redirect()->back();
    }
}
