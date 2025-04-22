<?php

use App\Http\Controllers\LikhaFormController;


Route::middleware('guest')->prefix('form')->group(function () {
    Route::get('/draft/{uuid}', [LikhaFormController::class, 'draft'])->name('form.draft');
    Route::get('/submitted/{uuid}', [LikhaFormController::class, 'thankyouPage'])->name('form.thankyouPage');
    Route::post('/step_one', [LikhaFormController::class, 'insertPersonalInfo'])
    ->middleware('throttle:stepOne')->name('form.step_one');
    Route::post('/step_one/update/{personalInfo}', [LikhaFormController::class, 'updatePersonalInfo'])
    ->middleware('throttle:UpdatingstepOne')->name('form.updatePersonalInfo');
    Route::post('/step_two/{personalInfo}', [LikhaFormController::class, 'insertOrUpdateFamilybackground'])
    ->middleware('throttle:stepTwo')->name('form.insertOrUpdateFamilybackground');
    Route::post('/step_three/{personalInfo}', [LikhaFormController::class, 'createOrUpdateFormalEducation'])
    ->middleware('throttle:stepThree')->name('form.createOrUpdateFormalEducation');
    Route::post('/step_four/{personalInfo}', [LikhaFormController::class, 'createOrUpdateNonFormalEducation'])
    ->middleware('throttle:stepFour')->name('form.createOrUpdateNonFormalEducation');
    Route::post('/step_five/{personalInfo}', [LikhaFormController::class, 'createOrUpdateArtisan'])
    ->middleware('throttle:stepFive')->name('form.createOrUpdateArtisan');
    Route::post('/step_six/{personalInfo}', [LikhaFormController::class, 'createOrUpdateOtherArts'])
    ->middleware('throttle:stepSix')->name('form.createOrUpdateOtherArts');
    
});