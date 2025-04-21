<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OtherArtsReqeust extends FormRequest
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
            '*.art_or_craft_name'=>'required|string|max:255',
            '*.related_practices'=>'nullable|string|max:255',
            '*.product_making_process'=>'nullable|string|max:255',
            '*.product_making_process_file'=>'nullable|file|mimes:pdf,jpg,jpeg,png,txt,doc,docx|max:5120',
            '*.region'=>'nullable|string|max:255',
            '*.province'=>'nullable|string|max:255',
            '*.city'=>'nullable|string|max:255',
            '*.sitio'=>'nullable|string|max:255',
        ];
    }
    public function messages(): array
    {
        return [
            '*.art_or_craft_name.required' => 'Art or craft name is required.',
            '*.product_making_process_file.max' => 'Product making process file maximum size is 5 MB.',
            '*.art_or_craft_name.max' => 'Art or craft name must not exceed 255 characters.',
            '*.product_making_process_file.mimes' => 'Invalid file type for product making process file.',
        ];
    }
    
}
