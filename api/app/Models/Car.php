<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    public $timestamps = false;

    protected $table = 'cars';

    protected $fillable = [
        'name',
        'range',
        'acceleration_0_100_s',
        'max_speed_kmh',
        'charging',
        'trunk_capacity',
        'guarantee',
        'main_image',
        'fk_type',
        'fk_drive',
    ];

    public function type()
    {
        return $this->belongsTo(Type::class, 'fk_type');
    }
    public function drive()
    {
        return $this->belongsTo(Drive::class, 'fk_drive');
    }
    public function versions()
    {
        return $this->belongsToMany(Version::class, 'car_has_version', 'fk_car', 'fk_version');
    }
    public function colors()
    {
        return $this->belongsToMany(Color::class, 'car_has_color', 'fk_car', 'fk_color');
    }
    public function additionals()
    {
        return $this->belongsToMany(Additional::class, 'car_has_additional', 'fk_car', 'fk_additional');
    }
    public function images()
    {
        return $this->belongsToMany(Image::class, 'car_has_image', 'fk_car', 'fk_image');
    }
}
