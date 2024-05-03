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

class RegisterRepository extends BaseRepository
{
    public function execute($request)
    {

        // $validatedData = $request->validated(); // Assuming you've applied validation in the request class
        // Create a new user record
        if (Auth::user()->role == 'SUPER ADMIN')

        $user = User::create([
            'role'                => strtoupper($request->role),
            'employee_number'     => $request->employeeNumber,
            'first_name'          => strtoupper($request->firstName),
            'middle_name'         => strtoupper($request->middleName),
            'last_name'           => strtoupper($request->lastName),
            'password'            => Hash::make($request->password),
        ]);


        $token = $user->createToken('User Password Grant Client')->plainTextToken;



        // Return a JSON response indicating success
        return response()->json(
            [
                'message' => 'Employee registered successfully',
                'user' => $user,
                'token' => $token,
            ]
        );
    }
}
