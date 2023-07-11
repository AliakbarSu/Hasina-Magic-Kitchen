<x-mail::message>

# Hi {{ $order->customer->name }},

## Thanks for your order!
Your order has been placed and is currently being processed. You'll receive another email once your order is confirmed by our team.

<x-mail::button :url="$order_link">
View your order
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
