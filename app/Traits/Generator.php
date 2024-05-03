<?php

namespace App\Traits;

use Carbon\Carbon;

use App\Models\User,
    App\Models\InventoryForm,
    App\Models\Department;


trait Generator
{
    protected function inventoryFormReferenceNumber(){
        do {

            $inventoryFormReferenceNumber = random_int(100000, 999999);

        } while (InventoryForm::where("inventory_form_reference_number", "=", $inventoryFormReferenceNumber)->first());

        return $inventoryFormReferenceNumber;

    }

    protected function departmentReferenceNumber(){
        do {

            $departmentReferenceNumber = random_int(100000, 999999);

        } while (Department::where("department_reference_number", "=", $departmentReferenceNumber)->first());

        return $departmentReferenceNumber;

    }

}
