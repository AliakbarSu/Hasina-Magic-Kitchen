<?php

namespace Database\Factories;

use App\Models\Customers;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Orders>
 */
class OrdersFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_name' => $this->faker->name(),
            'email' => $this->faker->email(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'date' => $this->faker->date(),
            'time' => $this->faker->time(),
            'note' => $this->faker->paragraph(),
            'customer_id' => Customers::factory(1)
                ->create()
                ->first(),
            'subtotal' => $this->faker->numberBetween($min = 150, $max = 2000),
            'tax' => $this->faker->numberBetween($min = 10, $max = 300),
            'total' => $this->faker->numberBetween($min = 200, $max = 2500),
            'status' => ['pending', 'completed', 'canceled'][
                array_rand([1, 2, 3], 1)
            ],
        ];
    }
}
