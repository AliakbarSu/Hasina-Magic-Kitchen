<?php

namespace App\Http\Controllers;

use App\Models\AddonsOrder;
use App\Models\ItemsMenuOrder;
use App\Models\ItemsOrder;
use App\Models\Orders;
use App\Notifications\OrderCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class OrdersController extends Controller
{
    public function all_orders(Orders $orders)
    {
        return $orders->all_orders()->toJson();
    }

    public function find_order($id, Orders $orders)
    {
        return $orders->get_order_by_id($id);
    }

    public function add_order(
        Request $request,
        CustomersController $customersController,
        AdminController $adminController
    ) {
        $validatedData = $request->validate([
            'customer_name' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'numeric', 'min:10'],
            'email' => ['required', 'email'],
            'address' => ['required', 'string'],
            'date' => ['required', 'date_format:d-m-Y'],
            'time' => ['required', 'date_format:H:i'],
            'note' => ['required', 'string', 'max:80'],
            'items' => ['required', 'array'],
            'items.*.dishes' => [
                'required',
                'array',
                'distinct',
                'exists:dishes,id',
            ],
            'items.*.menu_id' => ['required', 'uuid', 'exists:menus,id'],
            'items.*.quantity' => ['numeric', 'max:500', 'min:1'],
            'addons.*.dish_id' => ['exists:dishes,id'],
            'addons.*.quantity' => ['numeric', 'min:1', 'max:500'],
        ]);

        if (!Orders::can_palce_order()) {
            return response(400)->json('Cannot place order for this date!');
        }
        $customer = $customersController->create_customer($request);
        $order = $this->create_order($validatedData, $customer->id);
        try {
            $payment = $customer->pay($order->total * 100, [
                'metadata' => ['order_id' => $order->id],
            ]);
        } catch (\Throwable $th) {
            Log::error($th);
        }
        return response()->json([
            'message' => 'Order created successfully',
            'payment_link' => $payment->client_secret,
        ]);
    }

    private function create_order($orderDetails, $customer_id): Orders
    {
        $order = new Orders();
        $order->customer_name = $orderDetails['customer_name'];
        $order->phone = $orderDetails['phone'];
        $order->email = $orderDetails['email'];
        $order->address = $orderDetails['address'];
        $order->date = $orderDetails['date'];
        $order->time = $orderDetails['time'];
        $order->note = $orderDetails['note'];
        $order->total = 100;
        $order->status = 'pending';
        $order->customer()->associate($customer_id);
        $order->save();
        $this->save_order_items($order, $orderDetails);
        $this->save_order_addons($order, $orderDetails['addons']);
        $order->total = $this->calculate_total($order);
        $order->save();
        return $order;
    }

    private function save_order_items(Orders $order, $orderDetails)
    {
        $menu_items = array_map(function ($item) use ($order) {
            $itemOrder = new ItemsOrder([
                'menu_id' => $item['menu_id'],
                'order_id' => $order->id,
                'quantity' => $item['quantity'],
            ]);
            $itemOrder->save();
            $itemMenuOrder = array_map(function ($dish) use ($itemOrder) {
                return new ItemsMenuOrder([
                    'dish_id' => $dish,
                    'item_id' => $itemOrder['menu_id'],
                ]);
            }, $item['dishes']);
            $itemOrder->menu_items()->saveMany($itemMenuOrder);
            return $itemOrder;
        }, $orderDetails['items']);
        $order->items()->saveMany($menu_items);
    }

    private function save_order_addons(Orders $order, $addons_array)
    {
        $addons = array_map(function ($addon) use ($order) {
            return new AddonsOrder([
                'dish_id' => $addon['dish_id'],
                'order_id' => $order->id,
                'quantity' => $addon['quantity'],
            ]);
        }, $addons_array);
        $order->addons()->saveMany($addons);
    }

    private function calculate_total($order)
    {
        $total = 0;
        foreach ($order->items as $item) {
            $total += $item->menu->price;
        }
        return $total;
    }

    public function get_availability(Orders $orders)
    {
        return $orders->availability();
    }

    public function validate_address(Request $request)
    {
        $validatedData = $request->validate([
            'address' => 'required',
        ]);
        $address = $validatedData['address'];
        $response = Http::post(env('GOOGLE_ADDRESS_API'), [
            'address' => [
                'regionCode' => 'NZ',
                'locality' => 'Auckland',
                'addressLines' => $address,
            ],
        ]);
        if (
            property_exists(
                $response->object()->result->verdict,
                'hasUnconfirmedComponents'
            )
        ) {
            $isInvalid = !$response->object()->result->verdict
                ->hasUnconfirmedComponents;
            return response(['validation result' => $isInvalid]);
        } else {
            return response(['validation result' => true]);
        }
    }
}
