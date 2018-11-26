<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//
Route::get('/user/logout', 'AppModalController@logout');

Route::get('/modal/active', 'AppModalController@allClientActive');

Route::get('/account', 'AccountController@allAccount');
Route::get('/account/{account}/', 'AccountController@idAccount');

Route::get('/client', 'ClientsController@allClient');
Route::get('/client/{client}/', 'ClientsController@idClient');
Route::put('/client/{client}','ClientsController@update');

Route::get('/form', 'FormController@allForm');
Route::get('/form/{form}/', 'FormController@idForm');
Route::post('/form/create','FormController@store');
Route::put('/form/{form}','FormController@update');
Route::post('/form/modal', 'FormController@idModalForm');
Route::post('/form/create/form/template', 'FormController@storeFormTemplate');
Route::get('/form/template/{form}', 'FormController@idFormTemplate');
Route::get('/form/get/type', 'FormController@formType');


Route::post('/data/create', 'FormDataController@store');
Route::post('/data/get', 'FormDataController@idFormData');
Route::put('/data/{formData}','FormDataController@update');
Route::post('/data/client/', 'FormDataController@formDataExist');

Route::get('/template', 'TemplateController@allTemplate');
Route::post('/template/create','TemplateController@store');
Route::get('/template/{template}/', 'TemplateController@idTemplate');
Route::put('/template/{template}','TemplateController@update');
Route::get('/template/modal/{modal}', 'TemplateController@idModalTemplate');

