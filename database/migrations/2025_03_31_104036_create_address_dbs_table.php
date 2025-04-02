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
        Schema::create('address_dbs', function (Blueprint $table) {
            $table->id();
            $table->text('codename')->nullable();
            $table->text('codevalue')->nullable();
            $table->text('name')->nullable();
            $table->text('region_id')->nullable();
            $table->text('province_id')->nullable();
            $table->text('municipality_id')->nullable();
            $table->text('city_id')->nullable();
            $table->text('barangay_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address_dbs');
    }
};
