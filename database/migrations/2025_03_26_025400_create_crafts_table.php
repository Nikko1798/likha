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
        Schema::create('crafts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('personal_information_id')->constrained('personal_information');
            $table->integer('specialization_rank')->default(1);
            $table->string('specialization_name')->nullable();
            $table->string('region')->nullable();
            $table->string('province')->nullable();
            $table->string('city_municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->string('sitio')->nullable();
            $table->text('associative_narrative_of_production')->nullable();
            $table->text('product_making_process')->nullable();
            $table->text('product_making_process_file')->nullable();

            //this can be null, for now this is often for main specialization
            $table->text('product_image_pattern')->nullable();
            $table->text('product_image_pallete')->nullable();
            $table->text('vocabularies')->nullable();
            $table->text('vocabularies_file')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crafts');
    }
};
