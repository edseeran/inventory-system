<?php

namespace App\Repositories\Department;

use App\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Department;


class IndexDepartmentRepository extends BaseRepository
{
    public function execute(){

        if (Auth::user()->role == 'ADMIN' || Auth::user()->role == 'SUPER ADMIN' || Auth::user()->role == 'CUSTODIAN'){

            $department = Department::all();

        } else {

            return response(['message: You do not have permission to view this page'], 401);
        }

        return $this->success('List of Department Data', $this->getIndexData($department));

    }


}
