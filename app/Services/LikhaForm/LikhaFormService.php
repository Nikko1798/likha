<?php

namespace App\Services\LikhaForm;

use App\Helpers\ResponseHelper;

use App\Models\PersonalInformation;
use App\Models\AddressDb;
use App\Models\FamilyBackground;
use App\Models\EducationalBackground;

use Illuminate\Support\Str;
class LikhaFormService
{
    function insertPersonalInfo($request)
    {
        try {
            $uuid=Str::uuid();
            $region=AddressDb::select('name')->where('codename', 'REGION')->where('codevalue', $request['region'])->first();
            $province=AddressDb::select('name')->where('codename', 'PROVINCE')->where('codevalue', $request['province'])->first();
            $city=AddressDb::select('name')
            ->where('codename', 'CITY')->where('codevalue', $request['city_municipality'])->first();
            $barangay=AddressDb::select('name')
            ->where('codename', 'BARANGAY')->where('codevalue', $request['barangay'])->first();
            
            $personalInfo = PersonalInformation::create([
                'uuid' => $uuid,
                'current_step'=> 1,
                'first_name' => $request['first_name'],
                'middle_name' => $request['middle_name'],
                'last_name' => $request['last_name'],
                'name_extension' => $request['name_extension'],
                'other_name' => $request['other_name'],
                'gender' => $request['gender'],
                'age_group' => $request['age_group'],
                'place_of_birth' => $request['place_of_birth'],
            ]);
            $personalInfo->addresses()->create([
                'region'=>$region->name,
                'province' => $province->name,
                'city_municipality' => $city->name,
                'barangay' => $barangay->name,
                'street' => $request['street']
            ]);
            $step_one = $personalInfo->load('addresses');
         
            // return redirect()->route('form.draft', ['uuid' => $uuid]);
            return ResponseHelper::success($uuid, 'User created successfully!', 201);


        }
        catch (\Exception $e) {
            
            return ResponseHelper::error($e, 500);

        }
    }
    function updatePersonalInfo($personalInfo, $request){
        try {
            $region=AddressDb::select('name')->where('codename', 'REGION')->where('codevalue', $request['region'])->first();
            $province=AddressDb::select('name')->where('codename', 'PROVINCE')->where('codevalue', $request['province'])->first();
            $city=AddressDb::select('name')
            ->where('codename', 'CITY')->where('codevalue', $request['city_municipality'])->first();
            $barangay=AddressDb::select('name')
            ->where('codename', 'BARANGAY')->where('codevalue', $request['barangay'])->first();
            
            $personalInfo->update([
                'first_name' => $request['first_name'],
                'middle_name' => $request['middle_name'],
                'last_name' => $request['last_name'],
                'name_extension' => $request['name_extension'],
                'other_name' => $request['other_name'],
                'gender' => $request['gender'],
                'age_group' => $request['age_group'],
                'place_of_birth' => $request['place_of_birth'],
            ]);
            $personalInfo->addresses()->first()->update([
                'region' => $region->name,
                'province' => $province->name,
                'city_municipality' => $city->name,
                'barangay' => $barangay->name,
                'street' => $request['street']
            ]);
            $step_one = $personalInfo->load('addresses');
         
            // return redirect()->route('form.draft', ['uuid' => $uuid]);
            return ResponseHelper::success($step_one, 'Personal Info inserted successfully!', 201);


        }
        catch (\Exception $e) {
            
            return ResponseHelper::error($e, 500);

        }
    }

    function insertOrUpdateFamilyBackground($personalInfo, $request)
    {
        $familyBackgrounds = $request->all(); // Ensure we get an array
        if($personalInfo->current_step<=1){
            $personalInfo->update(['current_step'=>2]);
        }
        if (!empty($familyBackgrounds)) {
            
            $personalInfo->family_backgrounds()->delete();
    
            $data = array_map(fn($item) => [
                'relation' => $item['relation'],
                'name' => $item['family_member_name'],
                'personal_information_id' => $personalInfo->id,
            ], $familyBackgrounds);
    
            FamilyBackground::insert($data);
        }
    }
    function createOrUpdateNonFormalEducation($personalInfo, $request){
        $NonformalEducation = $request->all(); // Ensure we get an array
        if($personalInfo->current_step<=3){
            $personalInfo->update(['current_step'=>4]);
        }
        if (!empty($NonformalEducation)) {
            
            EducationalBackground::where('type', 'NONFORMAL')->delete();
 
            $data = array_map(fn($item) => [
                'type' => 'NONFORMAL',
                'transmission'=>$item['transmission'],
                'other_transmission'=>$item['other_transmission'],
                'mentor_name'=>$item['mentor'],
                'ordinal_generation'=>$item['ordinal_generation'],
                'place_of_mentoring'=>$item['place_of_mentoring'],
                'personal_information_id' => $personalInfo->id,
            ], $NonformalEducation);
    
            EducationalBackground::insert($data);
        }
    }
    
    function createOrUpdateFormalEducation($personalInfo, $request){
        $formalEducation = $request->all(); // Ensure we get an array
        if($personalInfo->current_step<=2){
            $personalInfo->update(['current_step'=>3]);
        }
        if (!empty($formalEducation)) {
            
            EducationalBackground::where('type', 'FORMAL')->delete();
    
            $data = array_map(fn($item) => [
                'type' => 'FORMAL',
                'education_level' => $item['education_level'],
                'course_or_study' => $item['course_or_study'],
                'school_name' => $item['school_name'],
                'years'=>$item['years_attended'],
                'personal_information_id' => $personalInfo->id,
            ], $formalEducation);
    
            EducationalBackground::insert($data);
        }
    }
}
