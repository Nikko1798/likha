<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArtisanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'artisan_name' => 'required|string|max:255',
            'indiginous_people_community' => 'nullable|string|max:255',
            'other_ipc' => 'nullable|string|max:255',
            'primary_art'=> 'required|string|max:255',
            'product_name'=> 'required|string|max:255',
            'product_material'=> 'nullable|string|max:255',
            'associative_narrative_of_production'=> 'nullable|string|max:255',
            'product_making_process'=> 'nullable|string|max:255',
            'product_making_process_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png,txt,doc,docx|max:5120', // 5MB max
            'product_image'=> 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'product_color_pallete'=>'nullable|string',
            'vocabularies'=>'nullable|string',
            'vocabularies_file' => 'nullable|file|mimes:pdf,jpg,jpeg,png,txt,doc,docx|max:5120',
            'region' => 'string|max:255',
            'province' => 'string|max:255',
            'city' => 'string|max:255',
            'barangay' => 'string|max:255',
            'sitio' => 'string|max:255',
        ];
    }
}
