<?php

namespace Database\Seeders;

use App\Models\UserType;
use Illuminate\Database\Seeder;

class UserTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items =[
            [
                'name' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'visitor',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($items as $item){
            UserType::updateOrCreate(['name' => $item['name']], $item);
        }
    }
}
