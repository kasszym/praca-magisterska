<?php

namespace App\Http\Controllers;

use App\Models\Car;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the cars with relations.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cars = Car::with(['type', 'drive', 'versions', 'colors', 'additionals', 'images'])->get();

        return response()->json($cars);
    }
}
