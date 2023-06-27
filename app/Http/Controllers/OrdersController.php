<?php

namespace App\Http\Controllers;

use App\Models\ItemsMenuOrder;
use App\Models\ItemsOrder;
use App\Models\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrdersController extends Controller
{
    public function all_orders()
    {
        return Orders::with(["items" => ["menu", "menu_items.dishes"]])->get()->toJson();
    }

    public function find_order($id)
    {
        return Orders::find($id);
    }

    private function create_order($orderDetails): Orders {
        
        $order = new Orders();
        $order->customer_name = $orderDetails["customer_name"];
        $order->phone = $orderDetails["phone"];
        $order->email = $orderDetails["email"];
        $order->address = $orderDetails["address"];
        $order->date = $orderDetails["date"];
        $order->time = $orderDetails["time"];
        $order->note = $orderDetails["note"];
        $order->total = 100;
        $order->status = "pending";
        $order->save();
        $menu_items = array_map(function($item) use ($order)  {
            $itemOrder = new ItemsOrder([
                "menu_id" => $item["menu_id"],
                "order_id" => $order->id,
            ]);
            $itemOrder->save();
            $itemMenuOrder = array_map(function($dish) use ($itemOrder) {
                return new ItemsMenuOrder([
                    "dish_id" => $dish,
                    "item_id" => $itemOrder["menu_id"]

                ]);
            }, $item["dishes"]);
            $itemOrder->menu_items()->saveMany($itemMenuOrder);
            return $itemOrder;
        }, $orderDetails["items"]);

        $order->items()->saveMany($menu_items);
        $order->total = $this->calculate_total($order);
        $order->save();
        return $order;
    }

    public function add_order(Request $request, CustomersController $customersController) {
        $validatedData = $request->validate([
            'customer_name' => ['required'],
            'phone' => ['required'],
            'email' => ['required'],
            'address' => "required",
            'date' => 'required',
            'time' => 'required',
            'note' => 'required',
            'items' => ['required', 'array'],
            'items.*.dishes' => ['required', 'array'],
            'items.*.menu_id' => ['required'],
        ]);
        $customer = $customersController->create_customer($request);
        $order = $this->create_order($validatedData);
        
        try {
            $payment = $customer->pay($order->total * 100, ["metadata" => ["order_id" => $order->id]]);
        } catch (\Throwable $th) {
            Log::error($th);
        }
        return response()->json([
            "message" => "Order created successfully",
            "payment_link" => $payment->client_secret,
        ]);
    }

    public function create_invoice($order) {
        $order = Orders::find("99801cca-915d-45e2-bde9-a7c1752361cd");
        $order->createAsStripeInvoice();
    }

    private function calculate_total($order) {
        $total = 0;
        foreach($order->items as $item) {
            $total += $item->menu->price;
        }
        return $total;
    }
}
