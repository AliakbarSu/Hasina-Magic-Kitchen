<x-mail::message>

# Hi {{ $order->customer->name }},

## Thanks for your order!
We are thrilled to inform you that your order with {{config('app.name')}} has been successfully confirmed! 

Your order will be delivered to the address provided on **{{$order_date}}**. 

Order Details:
<x-mail::panel>
Delivery Address: **{{$order->address}}**
</x-mail::panel>
<x-mail::panel>
Delivery Date: **{{$order_date}}** at **{{$order_time}}**
</x-mail::panel>

Should you have any questions or need further assistance, please don't hesitate to reach out to us.

<x-mail::button :url="$order_link">
View your order
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
