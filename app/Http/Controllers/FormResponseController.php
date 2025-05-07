<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\PersonalInformation;
use App\Models\Craft;

use Illuminate\Support\Facades\Storage;
class FormResponseController extends Controller
{
    //
    public function index(): Response|RedirectResponse
    {
        
        return Inertia::render('LikhaFormResponse/index');
    }
    public function likhaResponses(Request $request){

        $perPage = $request->input('perPage', 10); // Default to 10 per page
        $page = $request->input('page', 1); // Default page 1
        $responses=PersonalInformation::select('personal_information.*', 'artisan_infos.artisan_name')
        ->leftJoin('artisan_infos', 'artisan_infos.personal_information_id', 'personal_information.id')
        ->where('current_step','>=', 7)
        ->where(function ($query) use ($request){
            $query->where('personal_information.first_name', 'like', '%' . $request->name . '%')
                    ->orWhere('personal_information.middle_name', 'like', '%' . $request->name . '%')
                    ->orWhere('personal_information.last_name', 'like', '%' . $request->name . '%')
                    ->orWhere('artisan_infos.artisan_name', 'like', '%' . $request->name . '%');
        });
        
        return  $responses->paginate($perPage, ['*'], 'page', $page);
    }
    public function getResponseDetails(PersonalInformation $personal_information)
    {
        $responses = $personal_information->load([
            'family_backgrounds',
            'addresses',
            'educational_backgrounds',
            'artisan_info',
            'crafts',
        ]);
    
        return $responses;
    }
    public function getProductimg(Craft $craft)
    {
        $path = storage_path('app/public/uploads/' . $craft->product_image_pattern);

        if (!file_exists($path)) {
            abort(404);
        }

        $file = file_get_contents($path);
        $type = mime_content_type($path);

        return response($file, 200)->header("Content-Type", $type);
    }
    public function downloadFile($fileName){
        $path = storage_path('app/public/uploads/' . $fileName);

        if (file_exists($path)) {
            return response()->download($path);
        }
    
        abort(404, 'File not found.');
    }
}
