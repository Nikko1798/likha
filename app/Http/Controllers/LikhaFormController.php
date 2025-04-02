<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\PersonalInfoRequest;
use App\Http\Requests\FamilyBackgroundRequest;

use App\Services\LikhaForm\LikhaFormService;

use App\Models\PersonalInformation;
class LikhaFormController extends Controller
{
    //
    protected $likhaFormService;
    public function __construct(LikhaFormService $likhaFormService)
    {
        $this->likhaFormService=$likhaFormService;
    }
    public function draft($uuid): Response
    {
        if(PersonalInformation::where('uuid', $uuid)->exists())
        {
            $personalInfo=PersonalInformation::where('uuid', $uuid)->first();
            return Inertia::render('LikhaForm/index', [
                'personalInfo' => $personalInfo,
            ]);
        }
        else{
            return abort(404);
        }
    }
    public function insertPersonalInfo(PersonalInfoRequest $request)
    {
        return $this->likhaFormService->insertPersonalInfo($request);
    }
    public function updatePersonalInfo(PersonalInformation $personalInfo, PersonalInfoRequest $request)
    {
        return $this->likhaFormService->updatePersonalInfo($personalInfo, $request);
    }
    public function insertOrUpdateFamilybackground(PersonalInformation $personalInfo, FamilyBackgroundRequest $request)
    {
        return $this->likhaFormService->insertOrUpdateFamilyBackground($personalInfo, $request);
    }
}
