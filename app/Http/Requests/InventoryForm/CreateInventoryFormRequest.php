<?php

namespace App\Http\Requests\InventoryForm;

use Illuminate\Foundation\Http\FormRequest;

class CreateInventoryFormRequest extends FormRequest
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
            'department'        => ['string','required'],
            'facilityType'      => ['required', 'string', 'in:LABORATORY,CLASSROOM,OFFICE,OTHERS'],
            'otherFacilityType' => ['required_if:facilityType,OTHERS'],
            'asOfDate'          => ['required', 'date'],
            'item'              => ['required', 'string'],
            'brand'             => ['required', 'string'],
            'quantity'          => ['required', 'integer'],
            'itemSerialNumber'  => ['required', 'string'],
            'datePurchased'     => ['required', 'date'],
            'amount'            => ['required', 'integer'],
            'dateIssued'        => ['required', 'date'],
            'itemStatus'        => ['required', 'string', 'in:WORKING,NOT WORKING,FOR REPAIR,FOR CALIBRATION'],
        ];
    }
}
