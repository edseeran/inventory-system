<?php

namespace App\Http\Controllers;


// * REQUEST
use App\Http\Requests\InventoryForm\CreateInventoryFormRequest,
    App\Http\Requests\InventoryForm\ShowInventoryFormRequest,
    App\Http\Requests\InventoryForm\IndexInventoryFormRequest,
    App\Http\Requests\InventoryForm\ListInventoryFormRequest,
    App\Http\Requests\InventoryForm\UpdateInventoryFormRequest,
    App\Http\Requests\InventoryForm\DeleteInventoryFormRequest;


// * REPOSITORY
use App\Repositories\InventoryForm\CreateInventoryFormRepository,
    App\Repositories\InventoryForm\ShowInventoryFormRepository,
    App\Repositories\InventoryForm\IndexInventoryFormRepository,
    App\Repositories\InventoryForm\ListInventoryFormRepository,
    App\Repositories\InventoryForm\UpdateInventoryFormRepository,
    App\Repositories\InventoryForm\DeleteInventoryFormRepository;
use App\Repositories\InventoryForm\Enums\ReferenceNumberRepository;
use Illuminate\Http\Request;

class InventoryFormController extends Controller
{
    protected $create, $index, $list, $delete, $show, $update, $referenceNumber;

    // * CONSTRUCTOR INJECTION
    public function __construct(

        CreateInventoryFormRepository              $create,
        IndexInventoryFormRepository               $index,
        ListInventoryFormRepository                $list,
        DeleteInventoryFormRepository              $delete,
        ShowInventoryFormRepository                $show,
        UpdateInventoryFormRepository              $update,
        ReferenceNumberRepository                  $referenceNumber

    ) {
        $this->create   = $create;
        $this->index    = $index;
        $this->list     = $list;
        $this->delete   = $delete;
        $this->show     = $show;
        $this->update   = $update;
        $this->referenceNumber = $referenceNumber;
    }


    protected function create(CreateInventoryFormRequest $request)
    {
        return $this->create->execute($request);
    }

    protected function show(ShowInventoryFormRequest $request, $itemReferenceNumber)
    {
        return $this->show->execute($itemReferenceNumber);
    }

    protected function index(IndexInventoryFormRequest $request, $inventoryFormReferenceNumber)
    {
        return $this->index->execute($inventoryFormReferenceNumber);
    }

    protected function update(UpdateInventoryFormRequest $request, $inventoryReferenceNumber)
    {
        return $this->update->execute($request, $inventoryReferenceNumber);
    }

    protected function delete(DeleteInventoryFormRequest $request, $inventoryReferenceNumber)
    {
        return $this->delete->execute($inventoryReferenceNumber);
    }

    protected function list(ListInventoryFormRequest $request)
    {
        return $this->list->execute($request);
    }

    public function InventoryFormReferenceNumberEnums()
    {
        return $this->referenceNumber->execute();
    }
}
