<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

// app/Http/Controllers/Auth/Auth0IndexController.php
// ...
class Auth0IndexController extends Controller
{
    /**
     * Redirect to the Auth0 hosted login page
     *
     * @return mixed
     */

    public function index()
    {
        $isLoggedIn = \Auth::check();

        return view('welcomes')
            ->with('isLoggedIn', $isLoggedIn)
            ->with('user', \Auth::user());
    }


    public function login()
    {
        return \App::make('auth0')->login(null, null, ['scope' => 'openid email email_verified'], 'code') ;
    }

    /**
     * Log out of Auth0
     *
     * @return mixed
     */
    public function logout()
    {
        \Auth::logout();
        return  \Redirect::intended('/');
    }
}