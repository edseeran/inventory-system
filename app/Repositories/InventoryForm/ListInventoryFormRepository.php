<?php

namespace App\Repositories\InventoryForm;

use App\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\InventoryForm,
    App\Models\Department;


class ListInventoryFormRepository extends BaseRepository
{
    public function execute($request)

    {
        // $inventoryForms = InventoryForm::select('inventory_form_reference_number','as_of_date','facility_type','department_id')->get();

        if (Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN') {
            $inventoryForms = InventoryForm::all()->map(function ($inventoryForm){
                return [
                    'inventoryFormReferenceNumber' => $inventoryForm->inventory_form_reference_number,
                    'asOfDate' => $inventoryForm->as_of_date,
                    'facilityType' => $inventoryForm->facility_type,
                    'departmentCode' => $inventoryForm->department->department_code
                ];
            });
            return $this->success('Inventory Form Data', $inventoryForms);



        } else {

            return response(['message: You do not have permission to view this page'], 401);
        }
    }
}
