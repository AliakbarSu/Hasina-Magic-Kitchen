<?php

namespace Database\Factories;

use App\Models\Dish;
use App\Models\Menu;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DishMenu>
 */
class DishMenuFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // $dishes = Dish::factory(1)->create()->first();
        // return [
        //     "menu_id" => Menu::factory(1)->create()->first(),
        //     "dish_id" => Dish::factory(1)->create()->first()
        // ];
        return [];
    }
}
