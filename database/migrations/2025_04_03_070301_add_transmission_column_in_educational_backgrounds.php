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
        Schema::table('educational_backgrounds', function (Blueprint $table) {
            //
            $table->string('transmission')->nullable();
            $table->string('other_transmission')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('educational_backgrounds', function (Blueprint $table) {
            //
        });
    }
};
