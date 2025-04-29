<?php

use App\Http\Controllers\FormResponseController;


Route::middleware('auth')->prefix('response')->group(function () {
    Route::get('/', [FormResponseController::class, 'index'])->name('response.index');
    Route::get('/all-responses', [FormResponseController::class, 'likhaResponses'])->name('response.likhaResponses');
    Route::get('/detail/{personal_information}', [FormResponseController::class, 'getResponseDetails'])->name('response.getResponseDetails');
    Route::get('/product-image/{craft}', [FormResponseController::class, 'getProductimg'])->name('response.getProductimg');
    Route::get('/download_file/{fileName?}', [FormResponseController::class, 'downloadFile'])->name('response.downloadFile');
   
});