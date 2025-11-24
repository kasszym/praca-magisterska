<?php

namespace App\Http\Controllers;

use App\Models\ChatbotConversation;
use App\Models\ChatbotMessage;
use App\Models\ChatbotIntent;
use App\Models\Car;
use App\Models\Color;
use App\Events\ChatbotMessageSent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatbotController extends Controller
{
    /**
     * Get or create conversation for current user/session
     */
    public function getConversation(Request $request)
    {
        $userId = Auth::id();
        $sessionId = $request->input('session_id');

        $conversation = ChatbotConversation::where('status', 'active')
            ->where(function ($query) use ($userId, $sessionId) {
                if ($userId) {
                    $query->where('user_id', $userId);
                } else {
                    $query->where('session_id', $sessionId);
                }
            })
            ->first();

        if (!$conversation) {
            $conversation = ChatbotConversation::create([
                'user_id' => $userId,
                'session_id' => $sessionId,
                'status' => 'active',
            ]);
        }

        return response()->json([
            'conversation_id' => $conversation->id,
            'messages' => $conversation->messages()->orderBy('created_at')->get(),
        ]);
    }

    /**
     * Save a message to database
     */
    public function saveMessage(Request $request)
    {
        $validated = $request->validate([
            'conversation_id' => 'required|exists:chatbot_conversations,id',
            'sender' => 'required|in:user,bot',
            'message' => 'required|string',
            'intent' => 'nullable|string',
        ]);

        $message = ChatbotMessage::create($validated);

        // Broadcast the message via WebSocket
        broadcast(new ChatbotMessageSent($validated['conversation_id'], $message))->toOthers();

        return response()->json($message);
    }

    /**
     * Get all intents (for frontend pattern matching)
     */
    public function getIntents()
    {
        return response()->json(ChatbotIntent::all());
    }

    /**
     * Get car data by name or ID
     */
    public function getCarData(Request $request)
    {
        $carName = $request->input('car_name');
        $carId = $request->input('car_id');

        $query = Car::with(['types.versions.colors', 'types.versions.drives']);

        if ($carId) {
            $car = $query->find($carId);
        } else {
            $car = $query->where('name', 'like', "%{$carName}%")->first();
        }

        if (!$car) {
            return response()->json(['error' => 'Car not found'], 404);
        }

        return response()->json([
            'id' => $car->id,
            'name' => $car->name,
            'base_price' => $car->price,
            'types' => $car->types->map(function ($type) {
                return [
                    'id' => $type->id,
                    'name' => $type->name,
                    'price' => $type->price,
                    'versions' => $type->versions->map(function ($version) {
                        return [
                            'id' => $version->id,
                            'name' => $version->name,
                            'price' => $version->price,
                            'range' => $version->range,
                            'power' => $version->power,
                            'acceleration' => $version->acceleration,
                            'top_speed' => $version->top_speed,
                            'battery' => $version->battery,
                            'colors' => $version->colors->pluck('name'),
                            'drives' => $version->drives->pluck('name'),
                        ];
                    }),
                ];
            }),
        ]);
    }

    /**
     * Get all available colors
     */
    public function getColors()
    {
        return response()->json(Color::all(['id', 'name', 'price', 'color_code']));
    }

    /**
     * Get all cars (basic info)
     */
    public function getCars()
    {
        $cars = Car::all(['id', 'name', 'price']);
        return response()->json($cars);
    }

    /**
     * Close conversation
     */
    public function closeConversation(Request $request)
    {
        $conversationId = $request->input('conversation_id');

        $conversation = ChatbotConversation::find($conversationId);
        if ($conversation) {
            $conversation->update([
                'status' => 'closed',
                'ended_at' => now(),
            ]);
        }

        return response()->json(['success' => true]);
    }
}
