<?php

namespace App\Http\Controllers;

// * REQUEST
use App\Http\Requests\User\LoginRequest,
    App\Http\Requests\User\LogoutRequest,
    App\Http\Requests\User\IndexUserRequest,
    App\Http\Requests\User\RegisterRequest;


// * REPOSITORY
use App\Repositories\User\LoginRepository,
    App\Repositories\User\LogoutRepository,
    App\Repositories\User\IndexUserRepository,
    App\Repositories\User\RegisterRepository;


class UserController extends Controller
{
    protected $login, $register, $logout, $update, $index;

    // * CONSTRUCTOR INJECTION
    public function __construct(

        LoginRepository              $login,
        RegisterRepository           $register,
        LogoutRepository             $logout,
        IndexUserRepository          $index,

    ) {
        $this->login            = $login;
        $this->register         = $register;
        $this->logout           = $logout;
        $this->index            = $index;
    }


    protected function login(LoginRequest $request)
    {
        return $this->login->execute($request);
    }
    protected function index(IndexUserRequest $request)
    {
        return $this->index->execute($request);
    }
    protected function logout(LogoutRequest $request)
    {
        return $this->logout->execute($request);
    }
    protected function register(RegisterRequest $request)
    {
        return $this->register->execute($request);
    }
}
