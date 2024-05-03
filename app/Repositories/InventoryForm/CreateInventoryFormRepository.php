<?php

namespace App\Repositories\InventoryForm;

use App\Repositories\BaseRepository;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User,
    App\Models\Department,
    App\Models\InventoryForm;

class CreateInventoryFormRepository extends BaseRepository
{
    public function execute($request){

        $user = User::where('id','=', Auth::user()->id)->first();
        //$department = Department::where('department_code', $request->departmentCode)->first();


        // *** Create only if the user is an HR/ADMIN
        if(Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN' || Auth::user()->role == 'CUSTODIAN'){

            $inventoryForm = InventoryForm::create([

                "inventory_form_reference_number"     => $this->inventoryFormReferenceNumber(),
                "user_id"                             => $user->id,
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

        return $this->success('InventoryForm Successfully Created.', $this->getShowData($inventoryForm));
    }
}
