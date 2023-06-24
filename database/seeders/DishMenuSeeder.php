<?php

namespace Database\Seeders;

use App\Models\Dish;
use App\Models\Menu;
use Illuminate\Database\Seeder;

class DishMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $dishes = Dish::factory(10)->create();
        Menu::all()->each(function ($menu) use ($dishes) {
            $menu->dishes()->attach(
                $dishes->random(rand(1, 3))
            );
        });
    }
}
