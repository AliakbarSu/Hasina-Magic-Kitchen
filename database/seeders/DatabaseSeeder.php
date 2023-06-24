<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Dish;
use App\Models\Menu;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $dishes = Dish::factory(10)->create();
        Category::factory(3)->create();
        Menu::factory(3)->create()->each(function ($menu) use ($dishes) {
            $menu->dishes()->attach(
                $dishes->random(rand(1, 3))
            );
            $menu->options()->attach(
                $dishes->random(rand(1, 2))
            );
        });
    }
}
