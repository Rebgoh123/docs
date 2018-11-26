<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/link/{id}/form/{formId}/{name}/{day}', function ($id, $category) {
    return view('guest');
})->name('form')->middleware('signed');


Route::get('/storage/form/{folder}/{pdf}/{filesname}/{file}', function ($id, $category) {
    return view('welcome');
});


Route::get('/web/{reactRoutes}', function () {
    return view('welcome'); // your start view
})->where('reactRoutes', '^((?!api).)*$')->middleware('auth');

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/home', 'HomeController@index')->name('home');
