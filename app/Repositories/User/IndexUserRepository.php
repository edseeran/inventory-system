<?php

namespace App\Repositories\User;

use App\Repositories\BaseRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\User;


class IndexUserRepository extends BaseRepository
{
    public function execute(){

        $user = User::all();

        return $this->success('List of Users', $this->indexData($user));
    }

    private function indexData($user){

		foreach($user as $key => $value){
			$data[$key] = [
                "employeeNumber" => $value->employee_number,
                "role"           => $value->role,
                "userFullName"   => $value->middle_name == null ? "{$value->first_name} {$value->last_name}" : "{$value->first_name} {$value->middle_name} {$value->last_name}",
                "createdAt"      => strtoupper(Carbon::parse($value['created_at'])->format('F d, Y'))
			];
		}

		return $data ?? [];
	}

}
