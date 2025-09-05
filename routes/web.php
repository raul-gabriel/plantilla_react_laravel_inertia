<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::get('/login', [LoginController::class, 'index'])->name('login');
Route::post('/login', [LoginController::class, 'iniciarSesion']);
Route::post('/logout', [LoginController::class, 'destroy'])->name('logout');





// Dashboard (protegido)
Route::middleware(\App\Http\Middleware\CheckLogin::class)->group(function () {
    Route::get('/dashboard', [LoginController::class, 'indexDashboard'])->name('dashboard');
    Route::resource('usuarios', UsuarioController::class);



});
