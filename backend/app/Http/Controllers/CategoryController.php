<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryCollection;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    return new CategoryCollection(Category::all());
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:40',
    ]);

    $category = Category::create([
      'name' => $request->input('name'),
    ]);

    return response()->json([
      'message' => 'Category created successfully',
      'category' => $category,
    ], 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $category = Category::findOrFail($id);
    $category->delete();

    return response()->json([
      'message' => 'Category deleted successfully',
    ]);
  }
}
