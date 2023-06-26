<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ItemsOrder>
 */
class ItemsOrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'order_id' => Orders::factory(),
            // 'dish_id' => Dish::factory(),
            // 'quantity' => $this->faker->numberBetween(1, 10),
        ];
    }
}
