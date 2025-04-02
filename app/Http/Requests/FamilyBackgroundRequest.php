<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FamilyBackgroundRequest extends FormRequest
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
            '*.family_member_name' => 'required|string|max:255',
            '*.relation' => 'required|string', 
        ];
    }
    public function messages(): array
    {
        return [
            '*.family_member_name.required' => 'Family member name is required.',
            '*.family_member_name.string' => 'Family member name must be a string.',
            '*.family_member_name.max' => 'Family member name cannot exceed 255 characters.',
            '*.relation.required' => 'Relation is required.',
            '*.relation.string' => 'Relation must be a string.',
        ];
    }
}
