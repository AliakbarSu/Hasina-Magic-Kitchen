<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function all_categories()
    {
        return Category::all()->toJson();
    }

    public function category($id)
    {
        return Category::find($id)->toJson();
    }

    public function add_category(Request $request) {
        $validatedData = $request->validate([
            'name' => ['required'],
            'description' => ['required'],
        ]);
        $category = new Category();
        $category->name = $validatedData["name"];
        $category->category = $validatedData["category"];
        $category->save();
        return $category->header("Content-Type", "application/json")->toJson();
    }

    public function delete_category($id) {
        $category = Category::find($id);
        $category->delete();
        return response()->json(["message" => "Category deleted"], 200);
    }
}
