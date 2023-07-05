<?php

use App\Http\Controllers\DishController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrdersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/category', [CategoryController::class, 'all_categories']);
Route::get('/category/{id}', [CategoryController::class, 'category']);
Route::post('/category', [CategoryController::class, 'add_category']);
Route::delete('/category', [CategoryController::class, 'delete_category']);

Route::get('/dish', [DishController::class, 'all_dishes']);
Route::get('/dish/{id}', [DishController::class, 'dish']);
Route::post('/dish', [DishController::class, 'add_dish']);
Route::delete('/dish', [DishController::class, 'delete_dish']);

Route::get('/menu', [MenuController::class, 'all_menus']);
Route::get('/menu/{id}', [MenuController::class, 'menu']);
Route::post('/menu', [MenuController::class, 'add_menu']);
Route::post('/menu/media', [MenuController::class, 'add_menu_media']);
Route::delete('/menu', [MenuController::class, 'delete_menu']);

Route::get('/order', [OrdersController::class, 'all_orders']);
Route::get('/order/{id}', [OrdersController::class, 'find_order']);
Route::post('/order', [OrdersController::class, 'add_order']);

Route::get('/availability', [OrdersController::class, 'get_availability']);
Route::post('/validate/address', [OrdersController::class, 'validate_address']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
