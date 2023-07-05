<?php

namespace App\Http\Controllers;

use App\Models\Dish;
use Illuminate\Http\Request;

class DishController extends Controller
{
    public function all_dishes(Dish $dishes)
    {
        return $dishes->get_menus_with_media()->toJson();
    }
    public function dish($id)
    {
        return Dish::with(['category', 'menus'])
            ->find($id)
            ->toJson();
    }

    public function add_dish(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'price' => 'required|numeric',
            'category' => 'required|exists:categories,id',
        ]);
        $dish = new Dish();
        $dish->name = $validatedData['name'];
        $dish->description = $validatedData['description'];
        $dish->price = $validatedData['price'];
        $dish->category()->associate($validatedData['category']);
        $dish->save();
        return $dish->toJson();
    }

    public function add_dish_media(Request $request, Dish $dishes)
    {
        $validatedData = $request->validate([
            'id' => ['required'],
            'image' => ['required'],
        ]);
        $dish = $dishes->all()->find($validatedData['id']);
        $dish->attachMedia($request->file('image'));
        return response()->json(['message' => 'Dish media added'], 200);
    }

    public function delete_dish($id)
    {
        $dish = Dish::find($id);
        $dish->delete();
        return response()->json(['message' => 'Dish deleted'], 200);
    }
}
