<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChatbotIntent;

class ChatbotIntentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $intents = [
            [
                'name' => 'greeting',
                'keywords' => ['cześć', 'witaj', 'hej', 'dzień dobry', 'siema', 'hello', 'hi'],
                'response_template' => 'Cześć! Jestem wirtualnym konsultantem Aureon. Jak mogę Ci dzisiaj pomóc?',
                'requires_data' => false,
                'data_type' => null,
            ],
            [
                'name' => 'ask_price',
                'keywords' => ['cena', 'koszt', 'ile kosztuje', 'ile płacę', 'jaka cena', 'price'],
                'response_template' => null,
                'requires_data' => true,
                'data_type' => 'car',
            ],
            [
                'name' => 'ask_range',
                'keywords' => ['zasięg', 'ile kilometrów', 'jak daleko', 'dystans', 'range', 'battery'],
                'response_template' => null,
                'requires_data' => true,
                'data_type' => 'car',
            ],
            [
                'name' => 'ask_delivery',
                'keywords' => ['dostawa', 'kiedy dostanę', 'jak długo', 'termin dostawy', 'delivery', 'shipping'],
                'response_template' => 'Oferujemy trzy metody dostawy: Inpost (12,99 zł, 1-2 dni), Kurier FedEx (19,99 zł, 1-2 dni) oraz Poczta Polska (9,99 zł, 2-5 dni). Która opcja Cię interesuje?',
                'requires_data' => false,
                'data_type' => null,
            ],
            [
                'name' => 'ask_specs',
                'keywords' => ['specyfikacja', 'parametry', 'dane techniczne', 'moc', 'silnik', 'specs', 'specifications'],
                'response_template' => null,
                'requires_data' => true,
                'data_type' => 'car',
            ],
            [
                'name' => 'ask_colors',
                'keywords' => ['kolory', 'kolor', 'jakie kolory', 'lakier', 'colors', 'color'],
                'response_template' => null,
                'requires_data' => true,
                'data_type' => 'colors',
            ],
            [
                'name' => 'ask_versions',
                'keywords' => ['wersje', 'jakie wersje', 'modele', 'odmiany', 'versions', 'models'],
                'response_template' => null,
                'requires_data' => true,
                'data_type' => 'car',
            ],
            [
                'name' => 'ask_payment',
                'keywords' => ['płatność', 'jak zapłacić', 'forma płatności', 'payment', 'pay'],
                'response_template' => 'Możesz zapłacić online podczas składania zamówienia. Po wybrze samochodu i uzupełnieniu danych, przejdziesz do bezpiecznej płatności.',
                'requires_data' => false,
                'data_type' => null,
            ],
            [
                'name' => 'help',
                'keywords' => ['pomoc', 'help', 'nie wiem', 'co mogę', 'jak działa'],
                'response_template' => 'Mogę pomóc Ci z: ✓ Informacjami o cenach i modelach samochodów, ✓ Danymi technicznymi i zasięgiem, ✓ Dostępnymi kolorami i wersjami, ✓ Metodami dostawy i płatności. O co chciałbyś zapytać?',
                'requires_data' => false,
                'data_type' => null,
            ],
            [
                'name' => 'goodbye',
                'keywords' => ['do widzenia', 'cześć', 'pa', 'bye', 'goodbye', 'koniec'],
                'response_template' => 'Do zobaczenia! Jeśli będziesz mieć jakieś pytania, jestem zawsze do dyspozycji. 👋',
                'requires_data' => false,
                'data_type' => null,
            ],
        ];

        foreach ($intents as $intent) {
            ChatbotIntent::create($intent);
        }
    }
}
