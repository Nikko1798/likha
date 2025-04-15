<?php

namespace App\Services\LikhaForm;

use App\Helpers\ResponseHelper;

use App\Models\PersonalInformation;
use App\Models\AddressDb;
use App\Models\FamilyBackground;
use App\Models\EducationalBackground;
use App\Models\ArtisanInfo;
use App\Models\Craft;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
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
        if($personalInfo->current_step<=2){
            $personalInfo->update(['current_step'=>3]);
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
  
    
    function createOrUpdateFormalEducation($personalInfo, $request){
        $formalEducation = $request->all(); // Ensure we get an array
        if($personalInfo->current_step<=3){
            $personalInfo->update(['current_step'=>4]);
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
    function createOrUpdateNonFormalEducation($personalInfo, $request){
        $NonformalEducation = $request->all(); // Ensure we get an array
        if($personalInfo->current_step<=4){
            $personalInfo->update(['current_step'=>5]);
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
    function createOrUpdateArtisan($personalInfo, $request){
      
        try{
            DB::transaction(function () use ($personalInfo, $request) {
                if($personalInfo->current_step<=5){
                    $personalInfo->update(['current_step'=>6]);
                }
                if (!empty($request)) {
                    $artisan=ArtisanInfo::updateOrCreate(
                        ['personal_information_id' => $personalInfo->id], // condition
                        [                            // data to update or insert
                            'personal_information_id' => $personalInfo->id,
                            'artisan_name' => $request['artisan_name'],
                            'indegenous_people_community' => $request['indiginous_people_community'],
                            'other_indegenous_people_community' => $request['other_ipc']
                        ]   
                    );
                    $primaryCraft=Craft::updateOrCreate(
                        ['personal_information_id' => $personalInfo->id],
                        [
                            'personal_information_id' => $personalInfo->id,
                            'specialization_rank'=>1,
                            'specialization_name'=>$request['primary_art'],
                            'region'=>$request['region'],
                            'province'=>$request['province'],
                            'city_municipality'=>$request['city'],
                            'barangay'=>$request['barangay'],
                            'associative_narrative_of_production'=>$request['associative_narrative_of_production'],
                            'product_making_process'=>$request['product_making_process'],
                            'product_making_process_file'=>$request['product_making_process_file'],
                            'product_image_pattern'=>self::uploadArtisanProductImage($request, $artisan),
                            'product_image_pallete'=>$request['product_color_pallete'],
                            'vocabularies'=>$request['vocabularies'],
                            'vocabularies_file'=>$request['vocabularies_file'],
                        ]
                    );
                    
                    DB::commit();
                }
            }, 5);
        }
        catch(Exception $e){
            
        }
    }
    function uploadArtisanProductImage($request, $artisan){
        if ($request->hasFile('product_image')) {
            $file = $request->file('product_image');
            $filename = 'product_image_pattern_' . $artisan->id . '.' . $file->getClientOriginalExtension();
            $folder='uploads';
            $fullPath = $folder . '/' . $filename;
            if(Storage::disk('public')->exists($fullPath))
            {   
                Storage::disk('public')->delete($fullPath);
            }
            $path = $file->storeAs($folder, $filename, 'public');
            return $filename;
        }
    }
}
