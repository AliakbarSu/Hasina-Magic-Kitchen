<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Dotenv\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MenuController extends Controller
{
  
    public function all_menus()
    {
        return Menu::with(["dishes", "options"])->get()->toJson();
    }

    public function menu($id)
    {
        return Menu::with(["dishes", "options"])->find($id)->toJson();
    }

    public function add_menu(Request $request) {
        $validatedData = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
            'price' => "required|numeric",
            'dishes' => 'required|array|exists:dishes,id',
            'options' => 'required|array|exists:dishes,id'
        ]);
        $menu = new Menu();
        $menu->name = $validatedData["name"];
        $menu->description = $validatedData["description"];
        $menu->price = $validatedData["price"];
        $menu->save();
        $menu->dishes()->attach($validatedData["dishes"]);
        $menu->options()->attach($validatedData["options"]);
        $menu->save();
        return $menu->toJson();
    }

    public function delete_menu($id) {
        $menu = Menu::find($id);
        $menu->delete();
        return response()->json(["message" => "Menu deleted"], 200);
    }
}
