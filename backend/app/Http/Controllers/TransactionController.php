<?php

namespace App\Http\Controllers;

use App\Http\Resources\TransactionCollection;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    $transactionsQuery = auth()->user()->transactions()
      ->with(['category', 'type']);

    if ($request->has('category_id')) {
      $transactionsQuery->where('category_id', $request->input('category_id'));
    }

    if ($request->has('start_date') && $request->has('end_date')) {
      $startDate = Carbon::parse($request->input('start_date'))->timezone('Europe/Warsaw')->startOfDay();
      $endDate = Carbon::parse($request->input('end_date'))->timezone('Europe/Warsaw')->endOfDay();

      $transactionsQuery->whereBetween('date', [$startDate, $endDate]);
    } elseif ($request->has('start_date')) {
      $startDate = Carbon::parse($request->input('start_date'))->startOfDay();

      $transactionsQuery->where('date', '>=', $startDate);
    } elseif ($request->has('end_date')) {
      $endDate = Carbon::parse($request->input('end_date'))->timezone('Europe/Warsaw')->endOfDay();

      $transactionsQuery->where('date', '<=', $endDate);
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

    $collection = new TransactionCollection($transactions);

    $collection->additionalData = [
      "income_sum" => round($income, 2),
      "expense_sum" => round($expense, 2),
      "balance" => round($income - $expense, 2),
    ];

    return $collection;
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(Request $request)
  {
    $request->validate([
      'name' => ['required', 'string', 'max:40', 'regex:/^[\pL0-9.,\- ]+$/u'],
      'amount' => 'required|numeric',
      'type_id' => 'required|exists:types,id',
      'category_id' => 'required|exists:categories,id',
      'date' => 'nullable|date',
    ]);

    $transaction = Transaction::create([
      'name' => $request->input('name'),
      'amount' => $request->input('amount'),
      'type_id' => $request->input('type_id'),
      'category_id' => $request->input('category_id'),
      'user_id' => auth()->id(),
      'date' => $request->input('date')
        ? Carbon::parse($request
          ->input('date'))
          ->timezone('Europe/Warsaw')
        : Carbon::now('Europe/Warsaw'),
    ]);

    return response()->json([
      'message' => 'Transaction created successfully',
      'transaction' => new TransactionResource($transaction),
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
      'name' => ['required', 'string', 'max:40', 'regex:/^[\pL0-9.,\- ]+$/u'],
      'amount' => 'required|numeric',
      'type_id' => 'required|exists:types,id',
      'category_id' => 'required|exists:categories,id',
      'date' => 'nullable|date',
    ]);

    $transaction = Transaction::where('id', $id)
      ->where('user_id', auth()->id())
      ->firstOrFail();

    $transaction->update([
      'name' => $request->input('name'),
      'amount' => $request->input('amount'),
      'type_id' => $request->input('type_id'),
      'category_id' => $request->input('category_id'),
      'date' => $request->input('date')
        ? Carbon::parse($request
          ->input('date'))
          ->timezone('Europe/Warsaw')
        : Carbon::now('Europe/Warsaw'),
    ]);

    return response()->json([
      'message' => 'Transaction updated successfully',
      'transaction' => new TransactionResource($transaction),
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

    return response()->json([
      'message' => 'Transaction deleted successfully',
    ], 200);
  }
}
