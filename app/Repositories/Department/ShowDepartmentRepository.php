<?php

namespace App\Repositories\Department;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;

use App\Models\Department;


class ShowDepartmentRepository extends BaseRepository
{
    public function execute($departmentReferenceNumber){

        if (Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN' || Auth::user()->role == 'CUSTODIAN')
        {
            $departmentReferenceNumber = Department::where('department_reference_number', $departmentReferenceNumber)->first();

        }else{

            return response(['message: You do not have permission to view this page'], 401);

        }

        return $this->success('Show Department Data', $this->getShowData($departmentReferenceNumber));

    }

}
