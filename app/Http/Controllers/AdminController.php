<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function orders(Orders $orders) {
        return Inertia::render('Admin/Orders', ['orders' => $orders->all()]);
    }

    public function update_order_status(Request $request, Orders $orders) {
        if(!$request->order_id || !$request->status) {
            return redirect()->back();
        }
        $order = $orders->find($request->order_id);
        $order->status = $request->status;
        $order->save();
        return redirect()->back();
    }
}
