<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Store a new order
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'car_id' => 'required|exists:cars,id',
            'car_name' => 'required|string',
            'car_version' => 'required|string',
            'color_id' => 'nullable|exists:colors,id',
            'color_name' => 'nullable|string',
            'car_price' => 'required|numeric|min:0',
            'addons' => 'nullable|array',
            'addons.*.id' => 'required|exists:additionals,id',
            'addons.*.price' => 'required|numeric|min:0',
            'addons_total' => 'required|numeric|min:0',
            'delivery_method' => 'required|string|in:inpost,fedex,poczta',
            'delivery_method_label' => 'nullable|string',
            'delivery_eta' => 'nullable|string',
            'delivery_price' => 'required|numeric|min:0',
            'verification_method' => 'required|string|in:online,courier',
            'verification_price' => 'required|numeric|min:0',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'pesel' => 'required|string|size:11',
            'street' => 'required|string|max:255',
            'house_number' => 'required|string|max:50',
            'apartment_number' => 'nullable|string|max:50',
            'post_code' => 'required|string|max:10',
            'city' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'invoice_email' => 'nullable|email|max:255',
            'correspondence_street' => 'nullable|string|max:255',
            'correspondence_house_number' => 'nullable|string|max:50',
            'correspondence_apartment_number' => 'nullable|string|max:50',
            'correspondence_post_code' => 'nullable|string|max:10',
            'correspondence_city' => 'nullable|string|max:255',
            'total_price' => 'required|numeric|min:0',
        ]);

        // Extract addons before creating the order
        $addons = $validated['addons'] ?? [];
        unset($validated['addons']);

        $validated['user_id'] = Auth::id();
        $validated['status'] = 'pending';

        // Use transaction to ensure data consistency
        DB::beginTransaction();
        try {
            $order = Order::create($validated);

            // Attach addons with their prices at the time of order
            if (!empty($addons)) {
                $addonData = [];
                foreach ($addons as $addon) {
                    $addonData[$addon['id']] = [
                        'price' => $addon['price'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                $order->additionals()->attach($addonData);
            }

            DB::commit();

            // Load the relationships for the response
            $order->load('additionals');

            return response()->json([
                'message' => 'Zamówienie zostało utworzone pomyślnie',
                'order' => $order,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Wystąpił błąd podczas tworzenia zamówienia',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all orders for authenticated user
     */
    public function index(Request $request): JsonResponse
    {
        $orders = Order::where('user_id', Auth::id())
            ->with(['car', 'color', 'additionals'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    /**
     * Get a specific order
     */
    public function show(int $id): JsonResponse
    {
        $order = Order::where('user_id', Auth::id())
            ->with(['car', 'color', 'additionals'])
            ->findOrFail($id);

        return response()->json([
            'order' => $order,
        ]);
    }
}
