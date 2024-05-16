<?php

namespace App\Http\Controllers;

// * REQUEST
use App\Http\Requests\Department\CreateDepartmentRequest,
    App\Http\Requests\Department\ShowDepartmentRequest,
    App\Http\Requests\Department\IndexDepartmentRequest,
    App\Http\Requests\Department\UpdateDepartmentRequest,
    App\Http\Requests\Department\DeleteDepartmentRequest,
    App\Http\Requests\Department\ListDepartmentRequest;


// * REPOSITORY
use App\Repositories\Department\CreateDepartmentRepository,
    App\Repositories\Department\ShowDepartmentRepository,
    App\Repositories\Department\IndexDepartmentRepository,
    App\Repositories\Department\UpdateDepartmentRepository,
    App\Repositories\Department\ListDepartmentRepository,
    App\Repositories\Department\DeleteDepartmentRepository;


class DepartmentController extends Controller
{
    protected $create, $index, $delete, $show, $update, $list;

    // * CONSTRUCTOR INJECTION
    public function __construct(

        CreateDepartmentRepository              $create,
        IndexDepartmentRepository               $index,
        DeleteDepartmentRepository              $delete,
        ShowDepartmentRepository                $show,
        UpdateDepartmentRepository              $update,
        ListDepartmentRepository                $list,

    ) {
        $this->create   = $create;
        $this->index    = $index;
        $this->delete   = $delete;
        $this->show     = $show;
        $this->update   = $update;
        $this->list     = $list;
    }


    protected function create(CreateDepartmentRequest $request)
    {
        return $this->create->execute($request);
    }

    protected function show($departmentReferenceNumber)
    {
        return $this->show->execute($departmentReferenceNumber);
    }

    protected function index(IndexDepartmentRequest $request)
    {
        return $this->index->execute($request);
    }
    protected function list(ListDepartmentRequest $request)
    {
        return $this->list->execute($request);
    }

    protected function update(UpdateDepartmentRequest $request, $departmentReferenceNumber)
    {
        return $this->update->execute($request, $departmentReferenceNumber);
    }

    protected function delete(DeleteDepartmentRequest $request, $departmentReferenceNumber)
    {
        return $this->delete->execute($departmentReferenceNumber);
    }
}
