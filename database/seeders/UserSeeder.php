<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker, Str, Carbon\Carbon;

use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Command : php artisan db:seed --class = Database\\Seeders\\UserSeeder
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $seed = array(
                        [

                            "role"              => "SUPER ADMIN",
                            "first_name"        => "MARVIN",
                            "middle_name"       => "CORTEZ",
                            "last_name"         => "REYES",
                            "employee_number"   => "123456789",
                            "password"          => Hash::make('123456789'),

                        ],
                    );

        User:: insert($seed);
    }
}
