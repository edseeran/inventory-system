<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker, Str, Carbon\Carbon;
use Illuminate\Support\Facades\DB;



class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        $seed = array(
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"  => "ICTDU",
                "department_name"  => "INFORMATION AND COMMUNICATIONS TECHNOLOGY DEVELOPMENT UNIT",
                "department_type"  => "NON-ACADEMIC",
                "created_at"       => Carbon::now(),
            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"       => "CCIS",
                "department_name"       => "COLLEGE OF COMPUTING AND INFORMATION SCIENCES",
                "department_type"       => "ACADEMIC",
                "created_at" => Carbon::now(),
            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "COB",
                "department_name"        => "COLLEGE OF BUSINESS",
                "department_type"        => "ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "COE",
                "department_name"        => "COLLEGE OF ENGINEERING",
                "department_type"        => "ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "CASS",
                "department_name"        => "COLLEGE OF ARTS AND SOCIAL SCIENCES",
                "department_type"        => "ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "CHM",
                "department_name"        => "COLLEGE OF HOSPITALITY MANAGEMENT",
                "department_type"        => "ACADEMIC",

                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "COC",
                "department_name"        => "COLLEGE OF CRIMINOLOGY",
                "department_type"        => "ACADEMIC",

                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "COED",
                "department_name"        => "COLLEGE OF EDUCATION",
                "department_type"        => "ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "CON",
                "department_name"        => "COLLEGE OF NURSING",
                "department_type"        => "ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "ND",
                "department_name"        => "NSTP DEPARTMENT",
                "department_type"        => "ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "REGISTRAR OFFICE",
                "department_name"        => "REGISTRAR OFFICE",
                "department_type"        => "NON-ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "ADMISSION OFFICE",
                "department_name"        => "ADMISSION OFFICE",
                "department_type"        => "NON-ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "ACCOUNTING OFFICE",
                "department_name"        => "ACCOUNTING OFFICE",
                "department_type"        => "NON-ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "SCHOLARSHIP OFFICE",
                "department_name"        => "SCHOLARSHIP OFFICE",
                "department_type"        => "NON-ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "FOREIGN AFFRAIRS OFFICE",
                "department_name"        => "FOREIGN AFFRAIRS OFFICE",
                "department_type"        => "NON-ACADEMIC",
                "created_at"  => Carbon::now(),

            ],
            [ //16
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "HR",
                "department_name"        => "HUMAN RESOURCES",
                "department_type"        => "NON-ACADEMIC",
                "created_at"             => Carbon::now(),
            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "BASIC EDUCATION",
                "department_name"        => "BASIC EDUCATION",
                "department_type"        => "NON-ACADEMIC",
                "created_at"             => Carbon::now(),
            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "COLLEGE",
                "department_name"        => "COLLEGE",
                "department_type"        => "NON-ACADEMIC",
                "created_at"             => Carbon::now(),
            ],
            [
                "department_reference_number" => $faker->numberBetween(100000, 999999),
                "department_code"        => "ITS",
                "department_name"        => "INFORMATION TECHNOLOGY SERVICE",
                "department_type"        => "NON-ACADEMIC",
                "created_at"             => Carbon::now(),
            ],
        );

        DB::table('departments')->insert($seed);
    }
}
