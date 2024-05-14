<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController,
    App\Http\Controllers\InventoryFormController,
    App\Http\Controllers\DepartmentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([

    'prefix' => 'account'

], function ($route) {

    $route->post('/register',                   [UserController::class, 'register']);
    $route->post('/login',                      [UserController::class, 'login']);

    Route::group([

        'middleware' => 'auth:sanctum',

    ], function ($route) {

        $route->get('/index',                    [UserController::class, 'index']);
        $route->post('/logout',                  [UserController::class, 'logout']);
    });
});

//inventory form endpoints
Route::group([
    'prefix'     => 'inventory-form',
    'middleware' => 'auth:sanctum',
    'id'         => 'inventoryFormReferenceNumber'

], function ($route) {

    $route->post('/create',                                         [InventoryFormController::class, 'create']);
    $route->get('/index/{inventoryFormReferenceNumber}',            [InventoryFormController::class, 'index']);
    $route->delete('/delete/{id}',                                  [InventoryFormController::class, 'delete']);
    $route->get('/show/{itemReferenceNumber}',                      [InventoryFormController::class, 'show']);
    $route->put('/update/{id}',                                     [InventoryFormController::class, 'update']);
    $route->get(
        '/enums/reference-numbers',
        [InventoryFormController::class, 'InventoryFormReferenceNumberEnums']
    );
    $route->get('/list',                                            [InventoryFormController::class, 'list']);
});

//department endpoints
Route::group([
    'prefix'     => 'department',
    'middleware' => 'auth:sanctum',
    'id'         => 'departmentReferenceNumber'

], function ($route) {

    $route->post('/create',                                         [DepartmentController::class, 'create']);
    $route->get('/index',                                           [DepartmentController::class, 'index']);
    $route->delete('/delete/{id}',                                  [DepartmentController::class, 'delete']);
    $route->get('/show/{id}',                                       [DepartmentController::class, 'show']);
    $route->put('/update/{id}',                                     [DepartmentController::class, 'update']);
});
