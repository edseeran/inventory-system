<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

class Department extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_reference_number',
        'user_id',
        'department_code',
        'department_name',
        'department_type'
    ];

    protected function user() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
