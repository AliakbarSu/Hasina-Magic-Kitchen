<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Dish;
use App\Models\Menu;
use App\Models\Orders;
use App\Models\User;
use Database\Factories\AdminFactory;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1)->create();

        $path = Storage::path('test_files/default-photo1.jpg');
        $file = new UploadedFile(
            $path,
            'default-photo1.jpg',
            'image/jpg',
            1234,
            true
        );
        AdminFactory::new()->create();
        $dishes = Dish::factory(4)->create();
        $dishes->each(function ($dish) use ($file) {
            $dish->attachMedia($file);
            return $dish;
        });
        Category::factory(3)->create();
        $menus = Menu::factory(3)
            ->create()
            ->each(function ($menu) use ($dishes, $file) {
                $menu->dishes()->attach($dishes->random(rand(1, 3)));
                $menu->options()->attach($dishes->random(rand(1, 2)));
                $menu->attachMedia($file);
                $menu->save();
                return $menu;
            });
        $menu_ids = $menus->pluck('id')->toArray();
        $orders = Orders::factory(3)
            ->create()
            ->each(function ($order) use ($menu_ids, $dishes) {
                foreach ($menu_ids as $key => $id) {
                    $order->items()->attach([
                        $id => [
                            'quantity' => rand(1, 3),
                        ],
                    ]);
                    $order
                        ->items()
                        ->each(function ($item) use ($dishes, $order) {
                            $dish_ids = $dishes
                                ->pluck('id')
                                ->random(1, 2)
                                ->toArray();
                            foreach ($dish_ids as $key => $id) {
                                $item->order_dishes()->attach([
                                    $id => [
                                        'order_id' => $order->id,
                                    ],
                                ]);
                            }
                        });
                }
                return $order;
            });
        $orders->each(function ($order) use ($dishes) {
            $dishes_ids = $dishes->pluck('id')->toArray();
            foreach ($dishes_ids as $key => $id) {
                $order->addons()->attach([
                    $id => ['quantity' => rand(1, 3)],
                ]);
            }
        });
    }
}
