<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\DishController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

// Route::inertia("about", "About");

Route::get('/home', function (Request $request) {
    return Inertia::render('Home', []);
});
Route::get('/checkout', function (Request $request) {
    return Inertia::render('Checkout', []);
});

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        // "about" => route('about')
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name(
        'profile.edit'
    );
    Route::patch('/profile', [ProfileController::class, 'update'])->name(
        'profile.update'
    );
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
        'profile.destroy'
    );
    Route::get('/orders', [AdminController::class, 'orders'])->name(
        'admin.orders'
    );
    Route::get('/orders/{id}', [AdminController::class, 'order_details'])->name(
        'admin.order_details'
    );
    Route::patch('/orders/status', [
        AdminController::class,
        'update_order_status',
    ])->name('admin.orders.update.status');
});

Route::get('/menu', [DishController::class, 'menu'])->name('dish.menu');

require __DIR__ . '/auth.php';
