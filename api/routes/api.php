<?php

use Illuminate\Http\Request;
use App\Http\Controllers\{AgreementController, InformationController, TypeController, DriveController, CarController, OrderController};
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Support\Facades\Route;

// Public authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/auth/google', [AuthController::class, 'googleAuth']);


// Protected authentication routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Order routes
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});

// Public resource routes
Route::get('/agreements', [AgreementController::class, 'index']);
Route::get('/informations', [InformationController::class, 'index']);
Route::get('/types', [TypeController::class, 'index']);
Route::get('/drives', [DriveController::class, 'index']);
Route::get('/cars', [CarController::class, 'index']);
