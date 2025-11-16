<?php

namespace App\Http\Controllers;

use App\Models\Agreement;

class AgreementController extends Controller
{
     public function index()
    {
        return Agreement::all();
    }
}
