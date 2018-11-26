<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use Auth0\Login\Contract\Auth0UserRepository as Auth0Contract;
use Auth0\Login\Repository\Auth0UserRepository as UserRepo;

class AppServiceProvider extends ServiceProvider
{
    // ...
    public function register()
    {
        $this->app->bind(
            Auth0Contract::class,
            UserRepo::class
        );
    }
}
