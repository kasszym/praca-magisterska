<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('car_id')->constrained()->onDelete('cascade');

            // Car configuration
            $table->string('car_name');
            $table->string('car_version');
            $table->foreignId('color_id')->nullable()->constrained()->onDelete('set null');
            $table->string('color_name')->nullable();
            $table->decimal('car_price', 10, 2);

            // Additions/Addons as JSON
            $table->json('addons')->nullable();
            $table->decimal('addons_total', 10, 2)->default(0);

            // Delivery information
            $table->string('delivery_method'); // inpost, fedex, poczta
            $table->string('delivery_method_label')->nullable();
            $table->string('delivery_eta')->nullable();
            $table->decimal('delivery_price', 10, 2)->default(0);

            // Verification method
            $table->string('verification_method'); // online, courier
            $table->decimal('verification_price', 10, 2)->default(0);

            // Personal data
            $table->string('first_name');
            $table->string('last_name');
            $table->string('pesel', 11);

            // Address
            $table->string('street');
            $table->string('house_number');
            $table->string('apartment_number')->nullable();
            $table->string('post_code');
            $table->string('city');

            // Contact
            $table->string('email');
            $table->string('phone');

            // Invoice email
            $table->string('invoice_email')->nullable();

            // Correspondence address (if different)
            $table->string('correspondence_street')->nullable();
            $table->string('correspondence_house_number')->nullable();
            $table->string('correspondence_apartment_number')->nullable();
            $table->string('correspondence_post_code')->nullable();
            $table->string('correspondence_city')->nullable();

            // Pricing
            $table->decimal('total_price', 10, 2);

            // Order status
            $table->enum('status', ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
