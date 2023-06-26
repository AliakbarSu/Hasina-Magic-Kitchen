<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Client\Response;
use Laravel\Cashier\Events\WebhookReceived;

class StripeWebhooks extends Controller
{

    public function handle_event() {
        
    }

    public function handle(WebhookReceived $event)
    {
        if ($event->payload['type'] === 'payment_intent.succeeded') {
            $order = new Orders();
            $order->mark_as_paid("99801cca-915d-45e2-bde9-a7c1752361cd");
            return new Response('Webhook Handled', 200);
        }
    }
}
