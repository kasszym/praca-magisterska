<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AgreementController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/agreements', [AgreementController::class, 'index']);
