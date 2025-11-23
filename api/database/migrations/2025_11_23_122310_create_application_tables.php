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
        // Types table
        Schema::create('types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        // Drives table
        Schema::create('drives', function (Blueprint $table) {
            $table->id();
            $table->string('name');
        });

        // Colors table
        Schema::create('colors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('value'); // hex color value
        });

        // Versions table
        Schema::create('versions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('price', 10, 2);
        });

        // Additionals table
        Schema::create('additionals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->decimal('price', 10, 2)->default(0);
        });

        // Images table
        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->string('url');
        });

        // Informations table
        Schema::create('informations', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content')->nullable();
        });

        // Agreements table
        Schema::create('agreements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content')->nullable();
        });

        // Cars table
        Schema::create('cars', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('range')->nullable();
            $table->decimal('acceleration_0_100_s', 5, 2)->nullable();
            $table->integer('max_speed_kmh')->nullable();
            $table->string('charging')->nullable();
            $table->integer('trunk_capacity')->nullable();
            $table->string('guarantee')->nullable();
            $table->string('main_image')->nullable();
            $table->string('drivetrain')->nullable();
            $table->unsignedBigInteger('fk_type')->nullable();
            $table->unsignedBigInteger('fk_drive')->nullable();

            $table->foreign('fk_type')->references('id')->on('types')->onDelete('set null');
            $table->foreign('fk_drive')->references('id')->on('drives')->onDelete('set null');
        });

        // Pivot tables
        Schema::create('car_has_version', function (Blueprint $table) {
            $table->unsignedBigInteger('fk_car');
            $table->unsignedBigInteger('fk_version');

            $table->foreign('fk_car')->references('id')->on('cars')->onDelete('cascade');
            $table->foreign('fk_version')->references('id')->on('versions')->onDelete('cascade');

            $table->primary(['fk_car', 'fk_version']);
        });

        Schema::create('car_has_color', function (Blueprint $table) {
            $table->unsignedBigInteger('fk_car');
            $table->unsignedBigInteger('fk_color');

            $table->foreign('fk_car')->references('id')->on('cars')->onDelete('cascade');
            $table->foreign('fk_color')->references('id')->on('colors')->onDelete('cascade');

            $table->primary(['fk_car', 'fk_color']);
        });

        Schema::create('car_has_additional', function (Blueprint $table) {
            $table->unsignedBigInteger('fk_car');
            $table->unsignedBigInteger('fk_additional');

            $table->foreign('fk_car')->references('id')->on('cars')->onDelete('cascade');
            $table->foreign('fk_additional')->references('id')->on('additionals')->onDelete('cascade');

            $table->primary(['fk_car', 'fk_additional']);
        });

        Schema::create('car_has_image', function (Blueprint $table) {
            $table->unsignedBigInteger('fk_car');
            $table->unsignedBigInteger('fk_image');

            $table->foreign('fk_car')->references('id')->on('cars')->onDelete('cascade');
            $table->foreign('fk_image')->references('id')->on('images')->onDelete('cascade');

            $table->primary(['fk_car', 'fk_image']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_has_image');
        Schema::dropIfExists('car_has_additional');
        Schema::dropIfExists('car_has_color');
        Schema::dropIfExists('car_has_version');
        Schema::dropIfExists('cars');
        Schema::dropIfExists('agreements');
        Schema::dropIfExists('informations');
        Schema::dropIfExists('images');
        Schema::dropIfExists('additionals');
        Schema::dropIfExists('versions');
        Schema::dropIfExists('colors');
        Schema::dropIfExists('drives');
        Schema::dropIfExists('types');
    }
};
