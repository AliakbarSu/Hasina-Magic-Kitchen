<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Dish>
 */
class DishFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->text(40),
            'price' => $this->faker->randomFloat(2, 10, 50),
            "image" => $this->faker->imageUrl(640, 480, "food"),
            "category_id" => Category::factory(1)->create()->first(),
        ];
    }
}
