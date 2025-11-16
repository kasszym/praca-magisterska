<?php

namespace App\Http\Controllers;

use App\Models\Drive;

class DriveController extends Controller
{
    public function index()
    {
        return Drive::all();
    }
}
