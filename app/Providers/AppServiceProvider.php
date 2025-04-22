<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;

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
        //
        $this->throttle();
    }
    private function throttle(){
        RateLimiter::for('stepOne', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip());
        });
        RateLimiter::for('UpdatingstepOne', function (Request $request) {
            return Limit::perMinute(10)->by($request->ip());
        });
        RateLimiter::for('stepTwo', function (Request $request) {
            return Limit::perMinute(20)->by($request->ip());
        });
        RateLimiter::for('stepThree', function (Request $request) {
            return Limit::perMinute(20)->by($request->ip());
        });
        RateLimiter::for('stepFour', function (Request $request) {
            return Limit::perMinute(20)->by($request->ip());
        });
        RateLimiter::for('stepFive', function (Request $request) {
            return Limit::perMinute(20)->by($request->ip());
        });
        RateLimiter::for('stepSix', function (Request $request) {
            return Limit::perMinute(20)->by($request->ip());
        });
    }
}
