<?php

namespace Database\Seeders;

use App\Models\Region;
use Illuminate\Database\Seeder;

class RegionSeeder extends Seeder
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
                'name' => 'Ahafo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Ashanti',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bono',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bono East',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Central',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Eastern',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Greater Accra',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Nort East',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Northern',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Oti',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Savannah',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Upper East',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Upper West',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Volta',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Western',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Western North',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($items as $item){
            Region::updateOrCreate(['name' => $item['name']], $item);
        }
    }
}
