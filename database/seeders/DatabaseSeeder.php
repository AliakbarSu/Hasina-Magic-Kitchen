<?php

namespace Database\Seeders;


use App\Models\Category;
use App\Models\Dish;
use App\Models\ItemsMenuOrder;
use App\Models\ItemsOrder;
use App\Models\Menu;
use App\Models\Orders;
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
        $menus = Menu::factory(5)->create()->each(function ($menu) use ($dishes) {
            $menu->dishes()->attach(
                $dishes->random(rand(1, 3))
            );
            $menu->options()->attach(
                $dishes->random(rand(1, 2))
            );
        });
        
        Orders::factory(3)->create()->each(function ($order) use ($menus, $dishes) {
            for($i = 0; $i < 3; $i++) {
                $menu_id = $menus->toArray()[rand(0,4)]["id"]; 
                $itemOrder = new ItemsOrder();
                $itemOrder->order_id = $order["id"];
                $itemOrder->menu_id = $menu_id;
                $itemOrder->save();
                for($j = 0; $j < 3; $j++) {
                    $itemMenuOrder = new ItemsMenuOrder();
                    $itemMenuOrder->item_id = $itemOrder["id"];
                    $itemMenuOrder->dish_id = $dishes->toArray()[rand(0,4)]["id"];
                    $itemMenuOrder->save();
                }
            }
        });
    }
}
