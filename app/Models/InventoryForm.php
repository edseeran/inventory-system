<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User,
    App\Models\Department;

class InventoryForm extends Model
{
    use HasFactory;

    protected $fillable = [

        'inventory_form_reference_number',
        'user_id',
        'facility_type',
        'other_facility_type',
        'department_id',
        'as_of_date',
        'item',
        'brand',
        'quantity',
        'item_serial_number',
        'date_purchased',
        'amount',
        'date_issued',
        'item_status'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

}
