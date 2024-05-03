<?php

namespace App\Http\Controllers;

// * REQUEST
use App\Http\Requests\Department\CreateDepartmentRequest,
    App\Http\Requests\Department\ShowDepartmentRequest,
    App\Http\Requests\Department\IndexDepartmentRequest,
    App\Http\Requests\Department\UpdateDepartmentRequest,
    App\Http\Requests\Department\DeleteDepartmentRequest;


// * REPOSITORY
use App\Repositories\Department\CreateDepartmentRepository,
    App\Repositories\Department\ShowDepartmentRepository,
    App\Repositories\Department\IndexDepartmentRepository,
    App\Repositories\Department\UpdateDepartmentRepository,
    App\Repositories\Department\DeleteDepartmentRepository;


class DepartmentController extends Controller
{
   protected $create, $index, $delete, $show, $update;

    // * CONSTRUCTOR INJECTION
    public function __construct(

        CreateDepartmentRepository              $create,
        IndexDepartmentRepository               $index,
        DeleteDepartmentRepository              $delete,
        ShowDepartmentRepository                $show,
        UpdateDepartmentRepository              $update,

    ){
        $this->create   = $create;
        $this->index    = $index;
        $this->delete   = $delete;
        $this->show     = $show;
        $this->update   = $update;
    }


    protected function create(CreateDepartmentRequest $request) {
        return $this->create->execute($request);
    }

    protected function show(ShowDepartmentRequest $request, $departmentReferenceNumber) {
        return $this->show->execute($departmentReferenceNumber);
    }

    protected function index(IndexDepartmentRequest $request) {
        return $this->index->execute($request);
    }

    protected function update(UpdateDepartmentRequest $request, $departmentReferenceNumber) {
        return $this->update->execute($request, $departmentReferenceNumber);
    }

    protected function delete(DeleteDepartmentRequest $request, $departmentReferenceNumber) {
        return $this->delete->execute($departmentReferenceNumber);

    }

}
