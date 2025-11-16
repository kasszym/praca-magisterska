<?php

use Illuminate\Http\Request;
use App\Http\Controllers\{AgreementController, InformationController, TypeController, DriveController};
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/agreements', [AgreementController::class, 'index']);
Route::get('/informations', [InformationController::class, 'index']);
Route::get('/types', [TypeController::class, 'index']);
Route::get('/drives', [DriveController::class, 'index']);
