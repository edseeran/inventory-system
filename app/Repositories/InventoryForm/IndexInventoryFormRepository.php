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


                $inventoryForm = InventoryForm::where('inventory_form_reference_number', $inventoryFormReferenceNumber)->get();

        } else {

            return response(['message: You do not have permission to view this page'], 401);
        }

        return $this->success('Inventory Form Data', $this->getIndexData($inventoryForm));
    }
}
