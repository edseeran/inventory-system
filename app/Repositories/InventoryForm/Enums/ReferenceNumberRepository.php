<?php

namespace App\Repositories\InventoryForm\Enums;

use App\Repositories\BaseRepository;
use App\Models\InventoryForm;

class ReferenceNumberRepository extends BaseRepository
{
    public function execute()
    {
        $referenceNumbers = InventoryForm::pluck('inventory_form_reference_number');

        return $this->success('Reference Number', $referenceNumbers);
    }

    private function generateReferenceNumber($prefix)
    {
        return $prefix . '-' . strtoupper(uniqid());
    }
}
