<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AuthenticatedSessionController extends Controller
{
  /**
   * Handle an incoming authentication request.
   */
  public function store(LoginRequest $request): JsonResponse
  {
    $request->authenticate();

    // $request->session()->regenerate();

    return response()->json([
      'message' => 'User login successfully',
      'user' => [
        ...Auth::user()->toArray(),
        'role' => Auth::user()->role->name,
      ],
    ], Response::HTTP_OK);
  }

  /**
   * Destroy an authenticated session.
   */
  public function destroy(Request $request): JsonResponse
  {
    Auth::guard('web')->logout();

    $request->session()->invalidate();
    // $request->session()->regenerateToken();

    return response()->json([
      'message' => 'User logged out successfully',
    ], Response::HTTP_OK);
  }
}
