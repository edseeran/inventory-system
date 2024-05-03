<?php

namespace App\Repositories\InventoryForm;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;

use App\Models\InventoryForm;


class DeleteInventoryFormRepository extends BaseRepository
{
    public function execute($inventoryFormReferenceNumber){

        if(Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN')
        {
            $inventoryFormReferenceNumber = InventoryForm::where('inventory_form_reference_number', $inventoryFormReferenceNumber)->first();

            $inventoryFormReferenceNumber->delete();

        }else{

            return response(['message: You do not have permission to view this page'], 401);

        }
        return response(['message: Inventory Form Data Deleted Successfully'], 200);
    }

}
