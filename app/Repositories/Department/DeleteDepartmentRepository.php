<?php

namespace App\Repositories\Department;

use App\Repositories\BaseRepository;
use Illuminate\Support\Facades\Auth;

use App\Models\Department;


class DeleteDepartmentRepository extends BaseRepository
{
    public function execute($departmentReferenceNumber){

        if(Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN')
        {
            $departmentReferenceNumber = Department::where('department_reference_number', $departmentReferenceNumber)->first();

            $departmentReferenceNumber->delete();

        }else{

            return response(['message: You do not have permission to view this page'], 401);

        }
        return response(['message: department Data Deleted Successfully'], 200);
    }

}
