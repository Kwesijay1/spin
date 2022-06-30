<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Queue\Events\JobFailed;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if(config('app.env') === 'production') {
            \URL::forceScheme('https');
        }

        Schema::defaultStringLength(191);
        Paginator::useBootstrap();
        Queue::failing(function (JobFailed $event) {

            DB::table('failed_jobs')->insert([
                'connection' => $event->connectionName,
                'queue'      => $event->job,
                'payload'    => $event->exception,
            ]);
        });
    }
}
