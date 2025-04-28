<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonalInfoRequest extends FormRequest
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
    public function attributes()
    {
        return [
            'email'=> 'Email',
            'first_name' => 'First name', 
            'middle_name' => 'Middle name',
            'last_name' => 'Last name',
            'name_extension' => 'Name extension',
            'other_name' => 'Other name',
            'gender' => 'Gender',
            'age_group' => 'Age group',
            'place_of_birth' => 'Place of birth',
        ];
    }
    public function rules(): array
    {
        return [
            'email' => ['required', 'string', 'email', 'max:255'],
            'first_name' => ['required', 'string', 'max:255'],
            'middle_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'name_extension' => ['nullable', 'string', 'max:255'],
            'other_name' => ['nullable', 'string', 'max:255'],
            'gender' => ['nullable', 'string', 'max:255'],
            'age_group' => ['required', 'string', 'max:255'],
            'place_of_birth' => ['required', 'string', 'max:255'],
            
            
            'region' => ['required', 'string', 'max:255'],
            'province' => ['nullable', 'string', 'max:255'],
            'city_municipality' => ['nullable', 'string', 'max:255'],
            'barangay' => ['nullable', 'string', 'max:255'],
            'street' => ['required', 'string', 'max:255'],
            //

        ];
    }
}
