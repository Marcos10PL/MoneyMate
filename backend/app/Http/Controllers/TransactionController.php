<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionCollection;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $transactionsQuery = auth()->user()->transactions()->with(['category', 'type']);

    if ($request->has('category_id')) {
      $transactionsQuery->where('category_id', $request->input('category_id'));
    }

    if ($request->has('start_date') && $request->has('end_date')) {
      $transactionsQuery->whereBetween('created_at', [
        $request->input('start_date'),
        $request->input('end_date')
      ]);
    }

    if ($request->has('sort_by') && in_array($request->input('sort_by'), ['asc', 'desc'])) {
      $transactionsQuery->orderBy('amount', $request->input('sort_by'));
    } else if ($request->has('sort_by') && $request->input('sort_by') == 'asc') {
      $transactionsQuery->orderBy('amount', 'asc');
    }

    if ($request->has('search') && $request->input('search') != '') {
      $transactionsQuery->where('name', 'like', '%' . $request->input('search') . '%');
    }

    if ($request->has('type_id')) {
      $transactionsQuery->where('type_id', $request->input('type_id'));
    }

    $income = (float) auth()->user()->transactions()
      ->whereHas('type', fn($q) => $q
        ->where('name', 'income'))
      ->sum('amount');

    $expense = (float) auth()->user()->transactions()
      ->whereHas('type', fn($q) => $q
        ->where('name', 'expense'))
      ->sum('amount');

    $transactions = $transactionsQuery->paginate($request->input('per_page', 10));

    return new TransactionCollection($transactions)->additional([
      "data" => [
        "income_sum" => round($income, 2),
        "expense_sum" => round($expense, 2),
        "balance" => round($income - $expense, 2),
      ],
    ]);
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => 'required|string|max:40',
      'amount' => 'required|numeric',
      'type_id' => 'required|exists:types,id',
      'category_id' => 'required|exists:categories,id',
    ]);

    $transaction = Transaction::create([
      'name' => $request->input('name'),
      'amount' => $request->input('amount'),
      'type_id' => $request->input('type_id'),
      'category_id' => $request->input('category_id'),
      'user_id' => auth()->id(),
    ]);

    return response()->json([
      'message' => 'Transaction created successfully',
      'transaction' => $transaction,
    ], 201);
  }

  /**
   * Display the specified resource.
   */
  public function show(string $id)
  {
    $transaction = Transaction::where('id', $id)
      ->where('user_id', auth()->id())
      ->firstOrFail();

    return new TransactionResource($transaction);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(Request $request, string $id)
  {
    $request->validate([
      'name' => 'required|string|max:40',
      'amount' => 'required|numeric',
      'type_id' => 'required|exists:types,id',
      'category_id' => 'required|exists:categories,id',
    ]);

    $transaction = Transaction::where('id', $id)
      ->where('user_id', auth()->id())
      ->firstOrFail();

    $transaction->update([
      'name' => $request->input('name'),
      'amount' => $request->input('amount'),
      'type_id' => $request->input('type_id'),
      'category_id' => $request->input('category_id'),
    ]);

    return response()->json([
      'message' => 'Transaction updated successfully',
      'transaction' => $transaction,
    ], 200);

  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(string $id)
  {
    $transaction = Transaction::where('id', $id)
      ->where('user_id', auth()->id())
      ->first();

    if (!$transaction) {
      return response()->json([
        'message' => 'Transaction not found',
      ], 404);
    }

    $transaction->delete();

    return response()->noContent(204);
  }
}
