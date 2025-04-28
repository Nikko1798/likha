<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\PersonalInformation;
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
        $responses=PersonalInformation::select('personal_information.*')
        ->where(function ($query) use ($request){
            $query->where('personal_information.first_name', 'like', '%' . $request->name . '%')
                    ->orWhere('personal_information.middle_name', 'like', '%' . $request->name . '%')
                    ->orWhere('personal_information.last_name', 'like', '%' . $request->name . '%');
        });
        
        return  $responses->paginate($perPage, ['*'], 'page', $page);
    }
}
