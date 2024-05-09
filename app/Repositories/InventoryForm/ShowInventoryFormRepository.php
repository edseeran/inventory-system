<?php

namespace App\Repositories\InventoryForm;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;

use App\Models\InventoryForm;


class ShowInventoryFormRepository extends BaseRepository
{
    public function execute($itemReferenceNumber){

        if (Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN')
        {
            $itemReferenceNumber = InventoryForm::where('item_reference_number', $itemReferenceNumber)->get();

        }else{

            return response(['message: You do not have permission to view this page'], 401);

        }

        return $this->success('Show Inventory Item Data', $this->getShowData($itemReferenceNumber));

    }

}
