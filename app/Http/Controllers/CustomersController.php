<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    public function create_customer(Request $request)
    {
        $customer = Customers::firstOrCreate(
            [
                'email' => $request->email,
            ],
            [
                'name' => $request->customer_name,
                'phone' => $request->phone,
            ]
        );
        $customer->save();
        if (!$customer->stripe_id) {
            $customer->createAsStripeCustomer();
        }
        return $customer;
    }
}
