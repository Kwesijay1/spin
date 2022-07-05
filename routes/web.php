<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::post('/discount-generator/store', [App\Http\Controllers\DiscountGenerator::class, 'store'])->name('generator.store');
Route::post('/discount-generator/check-discount', [App\Http\Controllers\DiscountGenerator::class, 'ConfirmUserCanSpin'])->name('check-discount');

