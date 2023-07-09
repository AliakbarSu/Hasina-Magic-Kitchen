<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MenuController extends Controller
{
    public function all_menus(Menu $menu)
    {
        return $menu->get_menus_with_media()->toJson();
    }

    public function add_menu(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'price' => 'required|numeric',
            'dishes' => 'required|array|exists:dishes,id',
            'options' => 'required|array|exists:dishes,id',
        ]);
        $menu = new Menu();
        $menu->name = $validatedData['name'];
        $menu->description = $validatedData['description'];
        $menu->price = $validatedData['price'];
        $menu->save();
        $menu->dishes()->attach($validatedData['dishes']);
        $menu->options()->attach($validatedData['options']);
        $menu->save();
        Log::info('Menu created', ['menu' => $menu->name, 'id' => $menu->id]);
        return $menu->toJson();
    }

    public function add_menu_media(Request $request, Menu $menus)
    {
        $validatedData = $request->validate([
            'id' => ['required'],
            'image' => 'required',
        ]);
        $menu = $menus->all()->find($validatedData['id']);
        $menu->attachMedia($request->file('image'));
        Log::info('Menu media added', ['id' => $menu->id]);
        return response()->json(['message' => 'Menu media added'], 200);
    }

    public function delete_menu($id)
    {
        $menu = Menu::find($id);
        $menu->delete();
        Log::info('Menu deleted', ['id' => $menu->id]);
        return response()->json(['message' => 'Menu deleted'], 200);
    }
}
