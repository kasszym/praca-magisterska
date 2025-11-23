<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'car_id',
        'car_name',
        'car_version',
        'color_id',
        'color_name',
        'car_price',
        'addons',
        'addons_total',
        'delivery_method',
        'delivery_method_label',
        'delivery_eta',
        'delivery_price',
        'verification_method',
        'verification_price',
        'first_name',
        'last_name',
        'pesel',
        'street',
        'house_number',
        'apartment_number',
        'post_code',
        'city',
        'email',
        'phone',
        'invoice_email',
        'correspondence_street',
        'correspondence_house_number',
        'correspondence_apartment_number',
        'correspondence_post_code',
        'correspondence_city',
        'total_price',
        'status',
    ];

    protected $casts = [
        'addons' => 'array',
        'car_price' => 'decimal:2',
        'addons_total' => 'decimal:2',
        'delivery_price' => 'decimal:2',
        'verification_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];

    /**
     * Get the user that owns the order
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the car associated with the order
     */
    public function car(): BelongsTo
    {
        return $this->belongsTo(Car::class);
    }

    /**
     * Get the color associated with the order
     */
    public function color(): BelongsTo
    {
        return $this->belongsTo(Color::class);
    }
}
