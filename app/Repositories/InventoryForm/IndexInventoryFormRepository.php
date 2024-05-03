<?php

namespace App\Repositories\InventoryForm;

use App\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\InventoryForm;


class IndexInventoryFormRepository extends BaseRepository
{
    public function execute(){

        if (Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN'){

            $inventoryForm = InventoryForm::all();

        } else {

            return response(['message: You do not have permission to view this page'], 401);
        }

        return $this->success('List of Inventory Form Data', $this->getIndexData($inventoryForm));

    }

}
