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
    public function execute($request)
    {

        // return 1;

        $user = User::where('id', '=', Auth::user()->id)->first();
        $arrayForm = [];
        // $department = Department::where('department_code', $request->departmentCode)->first();

        // *** Create only if the user is an HR/ADMIN
        if (Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN' || Auth::user()->role == 'CUSTODIAN') {

            $inventoryFormReferenceNumber = $this->inventoryFormReferenceNumber();
            foreach ($request->inventoryForm as $form) {
                if (!empty($request->facilityType) && !empty($request->asOfDate)) {

                    InventoryForm::create([
                        "facility_type"                       => strtoupper($request->facilityType),
                        "other_facility_type"                 => strtoupper($request->otherFacilityType),
                        "department_id"                       => $this->getDepartmentId($request->department),
                        "as_of_date"                          => $request->asOfDate,
                        'inventory_form_reference_number'     => $inventoryFormReferenceNumber,
                        "item_reference_number"               => $this->itemReferenceNumber(),
                        "user_id"                             => $user->id,
                        "item"                                => strtoupper($form['item']),
                        "brand"                               => strtoupper($form['brand']),
                        "quantity"                            => $form['quantity'],
                        "item_serial_number"                  => strtoupper($form['itemSerialNumber']),
                        "date_purchased"                      => $form['datePurchased'],
                        "amount"                              => $form['amount'],
                        "date_issued"                         => $form['dateIssued'],
                        "item_status"                         => strtoupper($form['itemStatus']),
                    ]);
                } else {
                    // return 1;
                }
            }

            $inventoryForms = InventoryForm::where('inventory_form_reference_number', $inventoryFormReferenceNumber)->get();
        } else {

            return response(['message: You do not have permission to view this page'], 401);
        }

        return $this->success('InventoryForm Successfully Created.', $this->getIndexData($inventoryForms));
    }
}
