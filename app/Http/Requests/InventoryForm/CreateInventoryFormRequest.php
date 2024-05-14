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
            'inventoryForm'                     => ['array'],
            'department'                        => ['string','required'],
            'facilityType'                      => ['required', 'string', 'in:LABORATORY,CLASSROOM,OFFICE,OTHERS'],
            'inventoryForm.*.otherFacilityType' => ['required_if:facilityType,OTHERS'],
            'inventoryForm.*.item'              => ['required', 'string'],
            'inventoryForm.*.brand'             => ['required', 'string'],
            'inventoryForm.*.quantity'          => ['required', 'integer'],
            'inventoryForm.*.itemSerialNumber'  => ['required', 'string'],
            'inventoryForm.*.datePurchased'     => ['required', 'date'],
            'inventoryForm.*.amount'            => ['required', 'integer'],
            'inventoryForm.*.dateIssued'        => ['required', 'date'],
            'inventoryForm.*.itemStatus'        => ['required', 'string', 'in:WORKING,NOT WORKING,FOR REPAIR,FOR CALIBRATION'],
            'asOfDate'                          => ['required', 'date'],
        ];
    }
}
