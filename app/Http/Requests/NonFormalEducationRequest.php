<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NonFormalEducationRequest extends FormRequest
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
            '*.transmission' => 'nullable|string|max:255',
            '*.other_transmission' => 'nullable|string|max:255',
            '*.mentor' => 'nullable|string|max:255',
            '*.ordinal_generation' => 'nullable|string|max:255',
            '*.place_of_mentoring' => 'nullable|string|max:255',
        ];
    }
    public function attributes()
    {
        return [
            '*.transmission' => 'Transmission', 
            '*.other_transmission' => 'Other transmission', 
            '*.mentor' => 'Mentor', 
            '*.ordinal_generation' => 'Ordinal Generation',
            '*.place_of_mentoring' => 'Place of mentoring',
        ];
    }
}
