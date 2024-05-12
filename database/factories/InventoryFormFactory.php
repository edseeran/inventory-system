<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
use App\Models\InventoryForm;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InventoryForm>
 */
class InventoryFormFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create();
        return [
            'inventory_form_reference_number' => (string) $faker->randomNumber(),
            'item_reference_number' => (string) $faker->randomNumber(),
            'department_id' => $faker->numberBetween(1, 5),
            'facility_type' => $faker->randomElement(['LABORATORY', 'CLASSROOM', 'OFFICE', 'OTHERS']),
            'other_facility_type' => $faker->word,
            'item' => $faker->word,
            'brand' => $faker->company,
            'quantity' => $faker->randomNumber(),
            'item_serial_number' => $faker->uuid,
            'date_purchased' => $faker->date(),
            'amount' => $faker->randomNumber(),
            'date_issued' => $faker->date(),
            'item_status' => $faker->randomElement(['WORKING', 'NOT WORKING', 'FOR REPAIR', 'FOR CALIBRATION']),
            'as_of_date' => $faker->date(),
        ];
    }
}
