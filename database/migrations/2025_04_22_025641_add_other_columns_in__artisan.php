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
        Schema::table('crafts', function (Blueprint $table) {
            //
            $table->string('other_specialization_name')->nullable();
            $table->string('other_product_material')->nullable();
            $table->string('other_associative_narrative_of_production')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('artisan_infos', function (Blueprint $table) {
            //
        });
    }
};
