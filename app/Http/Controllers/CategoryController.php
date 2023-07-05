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

    public function add_category(Request $request)
    {
        $validatedData = $request->validate([
            'name' => ['required', 'max:50'],
            'description' => ['required', 'max:150'],
        ]);
        $category = new Category();
        $category->name = $validatedData['name'];
        $category->description = $validatedData['description'];
        $category->save();
        return $category->toJson();
    }

    public function delete_category($id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json(['message' => 'Category deleted'], 200);
    }
}
