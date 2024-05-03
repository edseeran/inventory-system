<?php

namespace App\Repositories\Department;

use App\Repositories\BaseRepository;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User,
    App\Models\Branch,
    App\Models\Department;

class UpdateDepartmentRepository extends BaseRepository
{
    public function execute($request, $departmentReferenceNumber){

        $user       = User::where('id','=', Auth::user()->id)->first();
        // $branch     = Branch::where('branch_name', $request->branchName)->first();
        // $department = Department::where('department_code', $request->departmentCode)->first();
        // $program    = Program::where('program_code', $request->programCode)->first();
        $department    = Department::where('department_reference_number','=', $departmentReferenceNumber)->first();


        // *** Create only if the user is an HR/ADMIN
        if(Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN'){

            $department->update([

                "department_code"                  => strtoupper($request->departmentCode),
                "department_name"                  => strtoupper($request->departmentName),
                "department_type"                  => strtoupper($request->departmentType)
            ]);
        }

        else{

            return response(['message: You do not have permission to view this page'], 401);

        }

        return $this->success('Department Successfully Updated.', $this->getShowData($department));
    }
}
