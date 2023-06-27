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
            $order_id = $event->payload['data']['object']['metadata']['order_id'];
            $order = new Orders();
            $order->mark_as_paid($order_id);
            return new Response('Webhook Handled', 200);
        }
    }
}
