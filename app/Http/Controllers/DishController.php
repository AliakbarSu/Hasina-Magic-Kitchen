<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller
{
    public function all_dishes()
    {
        return Dish::with(["category", "menus"])->get()->toJson();
    }
    public function dish($id)
    {
        return Dish::with(["category", "menus"])->find($id)->toJson();
    }

    public function add_dish(Request $request) {
        $validatedData = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'price' => "required|numeric",
            "image" => "required",
            'category' => 'required|exists:categories,id',
        ]);
        $dish = new Dish();
        $dish->name = $validatedData["name"];
        $dish->description = $validatedData["description"];
        $dish->price = $validatedData["price"];
        $dish->image = $validatedData["image"];
        $dish->category()->associate($validatedData["category"]);
        $dish->save();
        return $dish->toJson();
    }

    public function delete_dish($id) {
        $dish = Dish::find($id);
        $dish->delete();
        return response()->json(["message" => "Dish deleted"], 200);
    }
}
