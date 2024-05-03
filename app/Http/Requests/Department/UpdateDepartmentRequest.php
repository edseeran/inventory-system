<?php

namespace App\Http\Requests\Department;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDepartmentRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {

        return [

            'departmentCode'  => ['nullable', 'string'],
            'departmentName'  => ['nullable', 'string'],
            'departmentType'  => ['nullable', 'string','in:ACADEMIC,NON-ACADEMIC'],

        ];
    }
}
