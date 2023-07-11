<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Laravel\Cashier\Events\WebhookReceived;

class StripeWebhooks extends Controller
{
    public function handle_event()
    {
    }

    public function handle(
        WebhookReceived $event,
        AdminController $adminController,
        OrdersController $ordersController
    ) {
        if ($event->payload['type'] === 'payment_intent.succeeded') {
            $order_id =
                $event->payload['data']['object']['metadata']['order_id'];
            $order = new Orders();
            $order->mark_as_paid($order_id);
            $ordersController->customer_order_confirm_mail($order);
            $adminController->notifiy_new_order($order);
            return response('Webhook Handled', 200);
        }
    }
}
