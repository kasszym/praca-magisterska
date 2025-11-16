<?php

namespace App\Http\Controllers;

use App\Models\Information;

class InformationController extends Controller
{
    public function index()
    {
        return Information::all();
    }
}
