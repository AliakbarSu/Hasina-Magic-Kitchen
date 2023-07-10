<?php

namespace App\Http\Controllers;

use App\Models\OrderDishes;
use App\Models\Orders;
use App\Notifications\OrderCreated;
use App\Rules\AddressExits;
use App\Services\TaxCalculations\TaxCalculations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class OrdersController extends Controller
{
    private $delivery_fee_rate = 25.0;
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
        CustomersController $customersController
    ) {
        $validatedData = $this->validate_order($request);
        // TODO Needs to be implemented
        // if (!Orders::can_palce_order()) {
        //     return response(400)->json('Cannot place order for this date!');
        // }
        $customer = $customersController->create_customer($request);
        $order = $this->create_order($validatedData, $customer->id);
        $payment_intent = $this->create_payment_intent($customer, $order);
        Log::info('Order created successfully', ['order_id' => $order->id]);
        $this->notify_customer($customer, $order);
        return response()->json([
            'id' => $order->id,
            'message' => 'Order created successfully',
            'client_secret' => $payment_intent->client_secret,
        ]);
    }

    private function create_order($orderDetails, $customer_id): Orders
    {
        $order = new Orders();
        $order->customer_name = $orderDetails['customer_name'];
        $order->phone = $orderDetails['phone'];
        $order->email = $orderDetails['email'];
        $order->address = $orderDetails['address'];
        $order->date = date('Y-m-d', strtotime($orderDetails['date']));
        $order->time = $orderDetails['time'];
        $order->note = $orderDetails['note'];
        $order->status = 'pending';
        $order->customer()->associate($customer_id);
        $order->save();
        $this->save_order_items($order, $orderDetails['items']);
        $this->save_order_addons($order, $orderDetails);
        $order->subtotal = $this->calculate_subtotal($order);
        $order->delivery_fee = $this->calculate_delivery_fee();
        $order->tax = $this->calculate_order_tax($order);
        $order->total = $this->calculate_total($order);
        $order->save();
        return $order;
    }

    private function save_order_items(Orders $order, $orderDetails)
    {
        $convertedArray = [];
        foreach ($orderDetails as $key => $value) {
            $convertedArray[$value['menu_id']] = [
                'quantity' => $value['quantity'],
            ];
        }
        $order->items()->attach($convertedArray);
        $order->items->each(function ($item) use ($orderDetails) {
            $column = array_column($orderDetails, 'menu_id');
            $menu_index = array_search($item->id, $column);
            $dishes = $orderDetails[$menu_index]['dishes'];
            foreach ($dishes as $key => $value) {
                $item->order_dishes()->attach([
                    $value => [
                        'order_id' => $item->pivot['orders_id'],
                    ],
                ]);
            }
        });
        return $order;
    }

    private function save_order_addons(Orders $order, $orderDetails)
    {
        $convertedArray = [];
        foreach ($orderDetails['addons'] as $key => $value) {
            $convertedArray[$value['dish_id']] = [
                'quantity' => $value['quantity'],
            ];
        }
        return $order->addons()->attach($convertedArray);
    }

    private function validate_order($request)
    {
        return $request->validate([
            'customer_name' => ['required', 'string', 'max:50'],
            'phone' => ['required', 'numeric', 'min:10'],
            'email' => ['required', 'email'],
            'address' => ['required', 'string', new AddressExits()],
            'date' => ['required', 'date'],
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
            'addons' => ['array'],
            'addons.*.dish_id' => ['exists:dishes,id'],
            'addons.*.quantity' => ['numeric', 'min:1', 'max:500'],
        ]);
    }

    private function calculate_subtotal(Orders $order)
    {
        $order_items_total = $order->items->reduce(function ($carry, $item) {
            return $carry + $item->price * $item->pivot->quantity;
        }, 0);
        $order_addons_total = $order->addons->reduce(function ($carry, $addon) {
            return $carry + $addon->price * $addon->pivot->quantity;
        }, 0);
        return $order_items_total + $order_addons_total;
    }

    private function calculate_total($order)
    {
        return round($order->subtotal + $order->tax + $order->delivery_fee, 2);
    }

    private function calculate_order_tax($order)
    {
        $taxCalculations = resolve(TaxCalculations::class);
        $subTotal = $order->subtotal + $order->delivery_fee;
        return $taxCalculations->calculateGST($subTotal);
    }

    private function calculate_delivery_fee()
    {
        return $this->delivery_fee_rate;
    }

    private function create_payment_intent($customer, $order)
    {
        try {
            return $customer->payWith(
                $order->total * 100,
                ['card'],
                [
                    'metadata' => ['order_id' => $order->id],
                ]
            );
        } catch (\Throwable $th) {
            Log::error($th);
            response()->json(
                [
                    'message' => 'Payment failed',
                ],
                500
            );
        }
    }

    private function notify_customer($customer, $order)
    {
        try {
            $customer->notify(new OrderCreated($order));
        } catch (\Throwable $th) {
            Log::error($th);
        }
    }

    public function get_availability(Orders $orders)
    {
        return $orders->availability();
    }

    static function google_address_validator($address)
    {
        $street_address = collect(explode(',', $address))->first();
        $sublocality = collect(explode(',', $address))->get(1);
        $result = Http::post(env('GOOGLE_ADDRESS_API'), [
            'address' => [
                'regionCode' => 'NZ',
                'locality' => 'Auckland',
                'sublocality' => $sublocality,
                'addressLines' => $street_address,
            ],
        ]);
        return !property_exists(
            $result->object()->result->verdict,
            'hasUnconfirmedComponents'
        );
    }

    public function validate_address(Request $request)
    {
        $validatedData = $request->validate([
            'address' => 'required',
        ]);
        $address = $validatedData['address'];
        $isValid = $this->google_address_validator($address);
        return response(['validation_result' => $isValid]);
    }
}
