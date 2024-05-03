<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inventory_forms', function (Blueprint $table) {
            $table->id();
            $table->string('inventory_form_reference_number')->nullable();
            $table->foreignId('user_id')->nullable();
            $table->enum('facility_type',['LABORATORY','CLASSROOM','OFFICE','OTHERS']);
            $table->string('other_facility_type')->nullable();
            $table->foreignId('department_id')->nullable();
            $table->date('as_of_date');
            $table->string('item');
            $table->string('brand');
            $table->string('quantity');
            $table->string('item_serial_number');
            $table->date('date_purchased');
            $table->string('amount');
            $table->date('date_issued');
            $table->enum('item_status',['WORKING','NOT WORKING','FOR REPAIR','FOR CALIBRATION']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_forms');
    }
};
