<?php

namespace App\Repositories\InventoryForm;

use App\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\InventoryForm,
    App\Models\Department;


class IndexInventoryFormRepository extends BaseRepository
{
    public function execute($inventoryFormReferenceNumber)
    {

        if (Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN') {

            if ($inventoryFormReferenceNumber == 'all') {
                $inventoryForm = InventoryForm::all();
            } else {
                $inventoryForm = InventoryForm::where('inventory_form_reference_number', $inventoryFormReferenceNumber)->get();
            }
            // $inventoryForm = InventoryForm::where('inventory_form_reference_number', $inventoryFormReferenceNumber)->get();
            // $inventoryForm = InventoryForm::all();
            // $inventoryForm = InventoryForm::where("department_id", "=", $this->getDepartmentId($departmentCode))->get();

        } else {

            return response(['message: You do not have permission to view this page'], 401);
        }

        return $this->success('List of Inventory Form Data', $this->getIndexData($inventoryForm));
    }
}
