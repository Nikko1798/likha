<?php

use App\Http\Controllers\LikhaFormController;


Route::middleware('guest')->prefix('form')->group(function () {
    Route::get('/draft/{uuid}', [LikhaFormController::class, 'draft'])->name('form.draft');
    Route::post('/step_one', [LikhaFormController::class, 'insertPersonalInfo'])->name('form.step_one');
    Route::post('/step_one/update/{personalInfo}', [LikhaFormController::class, 'updatePersonalInfo'])->name('form.updatePersonalInfo');
    Route::post('/step_two/{personalInfo}', [LikhaFormController::class, 'insertOrUpdateFamilybackground'])->name('form.insertOrUpdateFamilybackground');
    Route::post('/step_three/{personalInfo}', [LikhaFormController::class, 'createOrUpdateFormalEducation'])->name('form.createOrUpdateFormalEducation');
    Route::post('/step_four/{personalInfo}', [LikhaFormController::class, 'createOrUpdateNonFormalEducation'])->name('form.createOrUpdateNonFormalEducation');
    
});