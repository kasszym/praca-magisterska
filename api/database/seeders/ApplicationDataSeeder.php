<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApplicationDataSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // Clear existing data
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('car_has_image')->truncate();
        DB::table('car_has_additional')->truncate();
        DB::table('car_has_color')->truncate();
        DB::table('car_has_version')->truncate();
        DB::table('cars')->truncate();
        DB::table('images')->truncate();
        DB::table('additionals')->truncate();
        DB::table('versions')->truncate();
        DB::table('colors')->truncate();
        DB::table('drives')->truncate();
        DB::table('types')->truncate();
        DB::table('informations')->truncate();
        DB::table('agreements')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // Insert Types
        $types = [
            ['id' => 1, 'name' => 'SUV'],
            ['id' => 2, 'name' => 'Sedan'],
            ['id' => 3, 'name' => 'Hatchback'],
            ['id' => 4, 'name' => 'Coupe'],
        ];
        DB::table('types')->insert($types);

        // Insert Drives
        $drives = [
            ['id' => 1, 'name' => 'AWD'],
            ['id' => 2, 'name' => 'FWD'],
            ['id' => 3, 'name' => 'RWD'],
        ];
        DB::table('drives')->insert($drives);

        // Insert Colors
        $colors = [
            ['id' => 1, 'name' => 'Biały', 'value' => '#FFFFFF'],
            ['id' => 2, 'name' => 'Czarny', 'value' => '#000000'],
            ['id' => 3, 'name' => 'Zielony', 'value' => '#00FF00'],
            ['id' => 4, 'name' => 'Czerwony', 'value' => '#FF0000'],
            ['id' => 5, 'name' => 'Niebieski', 'value' => '#0000FF'],
            ['id' => 6, 'name' => 'Srebrny', 'value' => '#C0C0C0'],
            ['id' => 7, 'name' => 'Szary', 'value' => '#808080'],
        ];
        DB::table('colors')->insert($colors);

        // Insert Versions
        $versions = [
            ['id' => 1, 'title' => 'Standard', 'price' => 150000.00],
            ['id' => 2, 'title' => 'Long Range', 'price' => 180000.00],
            ['id' => 3, 'title' => 'Performance', 'price' => 205000.00],
            ['id' => 4, 'title' => 'Premium', 'price' => 220000.00],
            ['id' => 5, 'title' => 'Sport', 'price' => 195000.00],
        ];
        DB::table('versions')->insert($versions);

        // Insert Additionals
        $additionals = [
            ['id' => 1, 'title' => 'Koła zimowe', 'price' => 5000.00],
            ['id' => 2, 'title' => 'Akcesoria', 'price' => 50000.00],
            ['id' => 3, 'title' => 'Autopilot', 'price' => 25000.00],
            ['id' => 4, 'title' => 'Pakiet premium audio', 'price' => 8000.00],
            ['id' => 5, 'title' => 'Szyberdach panoramiczny', 'price' => 12000.00],
            ['id' => 6, 'title' => 'Fotele sportowe', 'price' => 7000.00],
        ];
        DB::table('additionals')->insert($additionals);

        // Insert Images (placeholder URLs)
        $images = [
            ['id' => 1, 'url' => '/storage/cars/car1-1.jpg'],
            ['id' => 2, 'url' => '/storage/cars/car1-2.jpg'],
            ['id' => 3, 'url' => '/storage/cars/car1-3.jpg'],
            ['id' => 4, 'url' => '/storage/cars/car2-1.jpg'],
            ['id' => 5, 'url' => '/storage/cars/car2-2.jpg'],
            ['id' => 6, 'url' => '/storage/cars/car3-1.jpg'],
        ];
        DB::table('images')->insert($images);

        // Insert Cars
        $cars = [
            [
                'id' => 1,
                'name' => 'Aureon E-City',
                'range' => 400,
                'acceleration_0_100_s' => 6.5,
                'max_speed_kmh' => 180,
                'charging' => '45 min (80%)',
                'trunk_capacity' => 450,
                'guarantee' => '5 lat',
                'main_image' => '/storage/cars/aureon-city.jpg',
                'drivetrain' => 'FWD',
                'fk_type' => 3, // Hatchback
                'fk_drive' => 2, // FWD
            ],
            [
                'id' => 2,
                'name' => 'Aureon PX 2025',
                'range' => 550,
                'acceleration_0_100_s' => 4.2,
                'max_speed_kmh' => 220,
                'charging' => '30 min (80%)',
                'trunk_capacity' => 600,
                'guarantee' => '8 lat',
                'main_image' => '/storage/cars/aureon-px.jpg',
                'drivetrain' => 'AWD',
                'fk_type' => 1, // SUV
                'fk_drive' => 1, // AWD
            ],
            [
                'id' => 3,
                'name' => 'Aureon GT Sport',
                'range' => 500,
                'acceleration_0_100_s' => 3.8,
                'max_speed_kmh' => 250,
                'charging' => '25 min (80%)',
                'trunk_capacity' => 400,
                'guarantee' => '6 lat',
                'main_image' => '/storage/cars/aureon-gt.jpg',
                'drivetrain' => 'RWD',
                'fk_type' => 4, // Coupe
                'fk_drive' => 3, // RWD
            ],
            [
                'id' => 4,
                'name' => 'Aureon Lux Sedan',
                'range' => 480,
                'acceleration_0_100_s' => 5.5,
                'max_speed_kmh' => 200,
                'charging' => '35 min (80%)',
                'trunk_capacity' => 500,
                'guarantee' => '7 lat',
                'main_image' => '/storage/cars/aureon-lux.jpg',
                'drivetrain' => 'AWD',
                'fk_type' => 2, // Sedan
                'fk_drive' => 1, // AWD
            ],
        ];
        DB::table('cars')->insert($cars);

        // Insert Car-Version relationships
        $carVersions = [
            // Aureon E-City
            ['fk_car' => 1, 'fk_version' => 1], // Standard
            ['fk_car' => 1, 'fk_version' => 2], // Long Range

            // Aureon PX 2025
            ['fk_car' => 2, 'fk_version' => 2], // Long Range
            ['fk_car' => 2, 'fk_version' => 3], // Performance
            ['fk_car' => 2, 'fk_version' => 4], // Premium

            // Aureon GT Sport
            ['fk_car' => 3, 'fk_version' => 3], // Performance
            ['fk_car' => 3, 'fk_version' => 5], // Sport

            // Aureon Lux Sedan
            ['fk_car' => 4, 'fk_version' => 2], // Long Range
            ['fk_car' => 4, 'fk_version' => 4], // Premium
        ];
        DB::table('car_has_version')->insert($carVersions);

        // Insert Car-Color relationships (all cars have all colors)
        $carColors = [];
        for ($carId = 1; $carId <= 4; $carId++) {
            for ($colorId = 1; $colorId <= 7; $colorId++) {
                $carColors[] = ['fk_car' => $carId, 'fk_color' => $colorId];
            }
        }
        DB::table('car_has_color')->insert($carColors);

        // Insert Car-Additional relationships
        $carAdditionals = [
            // Aureon E-City
            ['fk_car' => 1, 'fk_additional' => 1], // Koła zimowe
            ['fk_car' => 1, 'fk_additional' => 2], // Akcesoria

            // Aureon PX 2025
            ['fk_car' => 2, 'fk_additional' => 1], // Koła zimowe
            ['fk_car' => 2, 'fk_additional' => 2], // Akcesoria
            ['fk_car' => 2, 'fk_additional' => 3], // Autopilot
            ['fk_car' => 2, 'fk_additional' => 4], // Premium audio
            ['fk_car' => 2, 'fk_additional' => 5], // Szyberdach

            // Aureon GT Sport
            ['fk_car' => 3, 'fk_additional' => 1], // Koła zimowe
            ['fk_car' => 3, 'fk_additional' => 3], // Autopilot
            ['fk_car' => 3, 'fk_additional' => 4], // Premium audio
            ['fk_car' => 3, 'fk_additional' => 6], // Fotele sportowe

            // Aureon Lux Sedan
            ['fk_car' => 4, 'fk_additional' => 1], // Koła zimowe
            ['fk_car' => 4, 'fk_additional' => 2], // Akcesoria
            ['fk_car' => 4, 'fk_additional' => 4], // Premium audio
            ['fk_car' => 4, 'fk_additional' => 5], // Szyberdach
        ];
        DB::table('car_has_additional')->insert($carAdditionals);

        // Insert Car-Image relationships
        $carImages = [
            ['fk_car' => 1, 'fk_image' => 1],
            ['fk_car' => 1, 'fk_image' => 2],
            ['fk_car' => 2, 'fk_image' => 3],
            ['fk_car' => 2, 'fk_image' => 4],
            ['fk_car' => 3, 'fk_image' => 5],
            ['fk_car' => 4, 'fk_image' => 6],
        ];
        DB::table('car_has_image')->insert($carImages);

        // Insert Informations
        $informations = [
            ['id' => 1, 'title' => 'O nas', 'content' => 'Aureon to polska marka samochodów elektrycznych.'],
            ['id' => 2, 'title' => 'Technologia', 'content' => 'Wykorzystujemy najnowsze technologie akumulatorów.'],
            ['id' => 3, 'title' => 'Ekologia', 'content' => 'Nasze samochody są w 100% ekologiczne.'],
        ];
        DB::table('informations')->insert($informations);

        // Insert Agreements
        $agreements = [
            ['id' => 1, 'title' => 'Regulamin', 'content' => 'Regulamin zakupu samochodów Aureon.'],
            ['id' => 2, 'title' => 'Polityka prywatności', 'content' => 'Dbamy o prywatność naszych klientów.'],
            ['id' => 3, 'title' => 'Warunki gwarancji', 'content' => 'Gwarancja obejmuje...'],
        ];
        DB::table('agreements')->insert($agreements);

        $this->command->info('✅ Test data seeded successfully!');
        $this->command->info('📊 Created:');
        $this->command->info('   - 4 car types');
        $this->command->info('   - 3 drive types');
        $this->command->info('   - 7 colors');
        $this->command->info('   - 5 versions');
        $this->command->info('   - 6 additional features');
        $this->command->info('   - 4 cars with full configurations');
        $this->command->info('   - 3 information pages');
        $this->command->info('   - 3 agreements');
    }
}
