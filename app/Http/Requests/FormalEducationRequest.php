<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FormalEducationRequest extends FormRequest
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
            '*.education_level' => 'nullable|string|max:255',
            '*.course_or_study' => 'nullable|string|max:255',
            '*.years_attended' => 'nullable|string|max:255',
            '*.school_name' => 'nullable|string|max:255',
        ];
    }
    public function attributes()
    {
        return [
            '*.education_level' => 'Level of education', 
            '*.course_or_study' => 'Course or Field of study', 
            '*.years_attended' => 'Years attended',
            '*.school_name' => 'School attended',
        ];
    }
}
