<?php

namespace App\Repositories\InventoryForm;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;

use App\Models\InventoryForm;


class ShowInventoryFormRepository extends BaseRepository
{
    public function execute($InventoryFormReferenceNumber){

        if (Auth::user()->role == 'ADMIN')
        {
            $InventoryFormReferenceNumber = InventoryForm::where('InventoryForm_reference_number', $InventoryFormReferenceNumber)->first();

        }else{

            return response(['message: You do not have permission to view this page'], 401);

        }

        return $this->success('Show InventoryForm Data', $this->getShowData($inventoryFormReferenceNumber));

    }

}
