<?php

namespace App\Broadcasting;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NexmoSMS
{
    /**
     * Create a new channel instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Authenticate the user's access to the channel.
     */
    public function send($notifiable, $notification)
    {
        // if (method_exists($notifiable, 'routeNotificationForLog')) {
        //     $to = $notifiable->routeNotificationForLog($notifiable);
        // } else {
        //     Log::error(
        //         'No to number found on the model' . get_class($notifiable)
        //     );
        //     return;
        // }

        $data = method_exists($notification, 'toNexmo')
            ? $notification->toNexmo($notifiable)
            : $notification->toArray($notifiable);

        if (empty($data)) {
            return;
        }
        try {
            Http::withHeaders([
                'headers' => [
                    'Content-Type' => 'application/x-www-form-urlencoded',
                    'Accept' => 'application/json',
                ],
            ])->post(env('VONAGE_API'), [
                'api_key' => env('VONAGE_KEY'),
                'api_secret' => env('VONAGE_SECRET'),
                'from' => env('SMS_FROM'),
                'to' => $data['to'],
                'text' => $data['text'],
                'ttl' => '20000',
            ]);
        } catch (\Exception $e) {
            Log::error((string) $e->getMessage());
        }

        return true;
    }
}
