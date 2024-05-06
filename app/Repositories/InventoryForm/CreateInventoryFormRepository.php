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
        $arrayForm = [];
        //$department = Department::where('department_code', $request->departmentCode)->first();

        // *** Create only if the user is an HR/ADMIN
        if(Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN' || Auth::user()->role == 'CUSTODIAN'){
            foreach($request->inventoryForm as $form){
               if (!empty($form['facilityType']) && !empty($form['asOfDate'])) {

                // return $form->otherFacilityType ?? 1;

                $inventoryForm = InventoryForm::create([
                    "inventory_form_reference_number"     => $this->inventoryFormReferenceNumber(),
                    "user_id"                             => $user->id,
                    "facility_type"                       => strtoupper($form['facilityType']),
                    "other_facility_type"                 => $form['otherFacilityType'] ?? null,
                    "department_id"                       => $this->getDepartmentId($form['department']),
                    "as_of_date"                          => strtoupper($form['asOfDate']),
                    "item"                                => strtoupper($form['item']),
                    "brand"                               => strtoupper($form['brand']),
                    "quantity"                            => $form['quantity'],
                    "item_serial_number"                  => strtoupper($form['itemSerialNumber']),
                    "date_purchased"                      => $form['datePurchased'],
                    "amount"                              => $form['amount'],
                    "date_issued"                         => $form['dateIssued'],
                    "item_status"                         => strtoupper($form['itemStatus']),

                ]);

                $arrayForm[] = $inventoryForm;
              }

              else{
                // return 1;
              }
           }

    }

        else{

            return response(['message: You do not have permission to view this page'], 401);

        }
        
        return $this->success('InventoryForm Successfully Created.', $this->getIndexData($arrayForm));
    }
}
