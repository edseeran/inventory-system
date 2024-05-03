<?php

namespace App\Http\Controllers;


// * REQUEST
use App\Http\Requests\InventoryForm\CreateInventoryFormRequest,
    App\Http\Requests\InventoryForm\ShowInventoryFormRequest,
    App\Http\Requests\InventoryForm\IndexInventoryFormRequest,
    App\Http\Requests\InventoryForm\UpdateInventoryFormRequest,
    App\Http\Requests\InventoryForm\DeleteInventoryFormRequest;


// * REPOSITORY
use App\Repositories\InventoryForm\CreateInventoryFormRepository,
    App\Repositories\InventoryForm\ShowInventoryFormRepository,
    App\Repositories\InventoryForm\IndexInventoryFormRepository,
    App\Repositories\InventoryForm\UpdateInventoryFormRepository,
    App\Repositories\InventoryForm\DeleteInventoryFormRepository;


use Illuminate\Http\Request;

class InventoryFormController extends Controller
{
    protected $create, $index, $delete, $show, $update;

    // * CONSTRUCTOR INJECTION
    public function __construct(

        CreateInventoryFormRepository              $create,
        IndexInventoryFormRepository               $index,
        DeleteInventoryFormRepository              $delete,
        ShowInventoryFormRepository                $show,
        UpdateInventoryFormRepository              $update,

    ){
        $this->create   = $create;
        $this->index    = $index;
        $this->delete   = $delete;
        $this->show     = $show;
        $this->update   = $update;
    }


    protected function create(CreateInventoryFormRequest $request) {
        return $this->create->execute($request);
    }

    protected function show(ShowInventoryFormRequest $request, $inventoryReferenceNumber) {
        return $this->show->execute($inventoryReferenceNumber);
    }

    protected function index(IndexInventoryFormRequest $request) {
        return $this->index->execute($request);
    }

    protected function update(UpdateInventoryFormRequest $request, $inventoryReferenceNumber) {
        return $this->update->execute($request, $inventoryReferenceNumber);
    }

    protected function delete(DeleteInventoryFormRequest $request, $inventoryReferenceNumber) {
        return $this->delete->execute($inventoryReferenceNumber);
    }

}