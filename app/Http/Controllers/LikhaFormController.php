<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Requests\PersonalInfoRequest;
use App\Http\Requests\FamilyBackgroundRequest;
use App\Http\Requests\NonFormalEducationRequest;
use App\Http\Requests\FormalEducationRequest;

use App\Services\LikhaForm\LikhaFormService;

use App\Models\PersonalInformation;
use App\Models\EducationalBackground;

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
            $personalInfo=PersonalInformation::select('personal_information.id', 'personal_information.uuid',
             'personal_information.first_name', 'personal_information.middle_name', 'personal_information.last_name',
             'personal_information.name_extension', 'personal_information.other_name', 
             'personal_information.gender','personal_information.age_group', 'personal_information.place_of_birth', 'personal_information.current_step',
             'region.codevalue as region', 'province.codevalue as province', 'city.codevalue as city_municipality', 
             'barangay.codevalue as barangay',
             'addresses.street'   
            )
            ->leftJoin('addresses', 'addresses.personal_information_id', 'personal_information.id')
            ->leftJoin('address_dbs as region', 'region.name', 'addresses.region')
            ->leftJoin('address_dbs as province', 'province.name', 'addresses.province')
            ->leftJoin('address_dbs as city', 'city.name', 'addresses.city_municipality')
            ->leftJoin('address_dbs as barangay', 'barangay.name', 'addresses.barangay')
            ->where('personal_information.uuid', $uuid)->first();
            $family_background=$personalInfo->load('family_backgrounds');
            $formalEducation=EducationalBackground::where('type', 'FORMAL')->where('personal_information_id', $personalInfo->id)->get();
            $NonformalEducation=EducationalBackground::where('type', 'NONFORMAL')->where('personal_information_id', $personalInfo->id)->get();
            
            return Inertia::render('LikhaForm/index', [
                'personalInfo' => $personalInfo,
                'family_background' => $family_background,
                'formalEducation' => $formalEducation,
                'NonformalEducation'=>$NonformalEducation
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
    public function createOrUpdateFormalEducation(PersonalInformation $personalInfo, FormalEducationRequest $request)
    {
        return $this->likhaFormService->createOrUpdateFormalEducation($personalInfo, $request);
    }
    public function createOrUpdateNonFormalEducation(PersonalInformation $personalInfo, NonFormalEducationRequest $request)
    {
        return $this->likhaFormService->createOrUpdateNonFormalEducation($personalInfo, $request);
    }
}
