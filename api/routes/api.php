<?php

use Illuminate\Http\Request;
use App\Http\Controllers\{AgreementController, InformationController};
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/agreements', [AgreementController::class, 'index']);
Route::get('/informations', [InformationController::class, 'index']);
