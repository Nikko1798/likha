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
        Schema::create('educational_backgrounds', function (Blueprint $table) {
            $table->id();
            $table->foreignId('personal_information_id')->constrained('personal_information');
            $table->string('type')->nullable(); //formal or non formal
            $table->string('education_level')->nullable();
            $table->string('course_or_study')->nullable();
            $table->string('years')->nullable();
            $table->string('school_name')->nullable();
            $table->string('mentor_name')->nullable(); // for non formal only
            $table->string('ordinal_generation')->nullable(); //for non formal only
            $table->string('place_of_mentoring')->nullable();//for non formal only
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educational_backgrounds');
    }
};
