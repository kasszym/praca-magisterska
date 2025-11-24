<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatbotIntent extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'keywords',
        'response_template',
        'requires_data',
        'data_type',
    ];

    protected $casts = [
        'keywords' => 'array',
        'requires_data' => 'boolean',
    ];
}
