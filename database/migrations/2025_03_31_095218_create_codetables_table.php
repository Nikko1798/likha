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
        Schema::create('codetables', function (Blueprint $table) {
            $table->id();
            $table->text('codename')->nullable();
            $table->text('codevalue')->nullable();
            $table->text('desc1')->nullable();
            $table->text('desc2')->nullable();
            $table->text('desc3')->nullable();
            $table->text('desc4')->nullable();
            $table->text('desc5')->nullable();
            $table->text('createdby')->nullable();
            $table->date('date_created')->nullable();
            $table->text('edited_by')->nullable();
            $table->date('date_edited')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('codetables');
    }
};
