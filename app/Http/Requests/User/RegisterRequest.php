<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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

            'role'          => ['string', 'in:CUSTODIAN,ADMIN,SUPER ADMIN'],
            'employeeNumber'=> ['required', 'string'],
            'firstName'     => ['required', 'string'],
            'middleName'    => ['nullable', 'string'],
            'lastName'      => ['required', 'string'],
            'password'      => ['required', 'string', 'min:3'],
        ];
    }
}
