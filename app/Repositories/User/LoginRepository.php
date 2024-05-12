<?php

namespace App\Repositories\User;

use App\Repositories\BaseRepository;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\Validated;
use Illuminate\Foundation\Http\Middleware\ValidatePostSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginRepository extends BaseRepository
{
    public function execute($request)
    {

        $user = User::where('employee_number', $request['employeeNumber'])->first();

        if (!$user || !Hash::check($request['password'], $user->password)) {

            return response(['message: Invalid credentials'], 404);
        } else {
            // $token = $user->createToken('User Password Grant Client')->plainTextToken;
            $token = $user->createToken($request->employeeNumber, ['*'])->plainTextToken;

            $response = [
                'user'  => $user,
                'token' => $token,
            ];

            return response($response, 200);
        }
    }
}
