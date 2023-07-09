<?php

namespace Database\Seeders;

use App\Models\AddonsOrder;
use App\Models\Category;
use App\Models\Customers;
use App\Models\Dish;
use App\Models\ItemsMenuOrder;
use App\Models\ItemsOrder;
use App\Models\Menu;
use App\Models\Orders;
use Database\Factories\AdminFactory;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Stripe\Customer;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
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
                return $menu;
            });
        $orders = Orders::factory(3)
            ->create()
            ->each(function ($order) use ($menus, $dishes) {
                for ($i = 0; $i < 3; $i++) {
                    $menu_id = $menus->toArray()[rand(0, 2)]['id'];
                    $itemOrder = new ItemsOrder();
                    $itemOrder->order_id = $order['id'];
                    $itemOrder->menu_id = $menu_id;
                    $itemOrder->quantity = 1;
                    $itemOrder->save();
                    for ($j = 0; $j < 3; $j++) {
                        $itemMenuOrder = new ItemsMenuOrder();
                        $itemMenuOrder->item_id = $itemOrder['id'];
                        $itemMenuOrder->dish_id = $dishes->toArray()[
                            rand(0, 3)
                        ]['id'];
                        $itemMenuOrder->save();
                    }
                }
            });
        $orders->each(function ($order) use ($dishes) {
            $dishes_array = $dishes->toArray();
            $random_key = array_rand($dishes_array);
            AddonsOrder::factory(3)->create([
                'dish_id' => $dishes_array[$random_key]['id'],
                'order_id' => $order->id,
                'quantity' => 1,
            ]);
        });
    }
}
