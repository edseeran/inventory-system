<?php

namespace App\Repositories\InventoryForm;

use App\Repositories\BaseRepository;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User,
    App\Models\InventoryForm;

class UpdateInventoryFormRepository extends BaseRepository
{
    public function execute($request, $inventoryReferenceNumber){

        $user = User::where('id','=', Auth::user()->id)->first();
        $inventory = InventoryForm::where('inventory_reference_number','=', $inventoryReferenceNumber)->first();


        // *** Create only if the user is an HR/ADMIN
        if(Auth::user()->role == 'ADMIN'){

            $inventory->update([

                "facility_type"                       => strtoupper($request->facilityType),
                "other_facility_type"                 => strtoupper($request->otherFacilityType),
                "department_id"                       => $this->getDepartmentId($request->department),
                "as_of_date"                          => strtoupper($request->asOfDate),
                "item"                                => strtoupper($request->item),
                "brand"                               => strtoupper($request->brand),
                "quantity"                            => $request->quantity,
                "item_serial_number"                  => strtoupper($request->itemSerialNumber),
                "date_purchased"                      => $request->datePurchased,
                "amount"                              => $request->amount,
                "date_issued"                         => $request->dateIssued,
                "item_status"                         => strtoupper($request->itemStatus),


            ]);
        }

        else{

            return response(['message: You do not have permission to view this page'], 401);

        }

        return $this->success('Inventory Form Successfully Updated.', $this->getShowData($inventory));
    }
}
