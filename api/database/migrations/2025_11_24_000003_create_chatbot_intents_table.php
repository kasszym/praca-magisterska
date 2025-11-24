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
        Schema::create('chatbot_intents', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique(); // greeting, ask_price, ask_delivery, ask_specs, etc.
            $table->json('keywords'); // ["cześć", "witaj", "hej"]
            $table->text('response_template')->nullable(); // Template for response
            $table->boolean('requires_data')->default(false); // Does it need DB query?
            $table->string('data_type')->nullable(); // car, delivery, price, etc.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chatbot_intents');
    }
};
