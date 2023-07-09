<?php

namespace App\Providers;

use App\Services\TaxCalculations\TaxCalculations;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\ServiceProvider;

class TaxServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(TaxCalculations::class, function (
            Application $app
        ) {
            return new TaxCalculations();
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
