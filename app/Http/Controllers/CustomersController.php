<?php

namespace App\Http\Controllers;

use App\Models\Customers;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    public function create_customer(Request $request) {
        $existing_customer = Customers::where("email", $request->email)->first();
        if($existing_customer) {
            return $existing_customer;
        }
        $customer = new Customers();
        $customer->name = $request->customer_name;
        $customer->email = $request->email;
        $customer->phone = $request->phone;
        $customer->save();
        $customer->createAsStripeCustomer();
        return $customer;
    }
}
