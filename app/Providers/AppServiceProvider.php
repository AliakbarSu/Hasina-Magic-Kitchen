<?php

namespace App\Providers;

use App\Broadcasting\NexmoSMS;
use App\Models\Customers;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\ServiceProvider;
use Laravel\Cashier\Cashier;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Cashier::useCustomerModel(Customers::class);
        Notification::extend('nexmo', function ($app) {
            return new NexmoSMS();
        });
    }
}
