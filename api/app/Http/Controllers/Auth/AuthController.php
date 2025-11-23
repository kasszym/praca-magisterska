<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Create a token for the newly registered user
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Rejestracja zakończona pomyślnie',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    /**
     * Login user
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['Podane dane logowania są nieprawidłowe.'],
            ]);
        }

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Logowanie zakończone pomyślnie',
            'user' => $user,
            'token' => $token,
        ]);
    }

    /**
     * Logout user
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Wylogowano pomyślnie',
        ]);
    }

    /**
     * Get authenticated user
     */
    public function user(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user(),
        ]);
    }

    /**
     * Handle Google OAuth login/register
     * This accepts a verified Google user payload from the frontend
     */
    public function googleAuth(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'name' => 'required|string',
            'google_id' => 'required|string',
        ]);

        try {
            // Find or create user
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                // Create new user
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => Hash::make(uniqid()), // Random password for OAuth users
                    'google_id' => $request->google_id,
                ]);

                $message = 'Rejestracja przez Google zakończona pomyślnie';
            } else {
                // Update google_id if not set
                if (!$user->google_id) {
                    $user->update(['google_id' => $request->google_id]);
                }

                $message = 'Logowanie przez Google zakończone pomyślnie';
            }

            // Create token
            $token = $user->createToken('auth-token')->plainTextToken;

            return response()->json([
                'message' => $message,
                'user' => $user,
                'token' => $token,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Błąd podczas uwierzytelniania przez Google: ' . $e->getMessage(),
            ], 500);
        }
    }
}

