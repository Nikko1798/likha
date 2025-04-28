<?php

use App\Http\Controllers\FormResponseController;


Route::middleware('auth')->prefix('response')->group(function () {
    Route::get('/', [FormResponseController::class, 'index'])->name('response.index');
    Route::get('/all-responses', [FormResponseController::class, 'likhaResponses'])->name('response.likhaResponses');
    
});