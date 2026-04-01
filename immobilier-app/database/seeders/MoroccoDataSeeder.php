<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\RealstateCategory;
use App\Models\TypeTransaction;
use App\Models\Country;
use App\Models\Region;
use App\Models\City;

class MoroccoDataSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Categories (Classifications)
        $categories = [
            ['category' => 'Appartements', 'code' => 'apartments'],
            ['category' => 'Maisons', 'code' => 'houses'],
            ['category' => 'Villas & maisons de luxe', 'code' => 'villas'],
            ['category' => 'Riad', 'code' => 'riad'],
            ['category' => 'Locaux commerciaux', 'code' => 'commercial'],
            ['category' => 'Bureaux', 'code' => 'offices'],
            ['category' => 'Terrains', 'code' => 'land'],
            ['category' => 'Fermes', 'code' => 'farms'],
        ];
        foreach ($categories as $cat) {
            RealstateCategory::updateOrCreate(['code' => $cat['code']], $cat);
        }

        // 2. Transaction Types
        $transactions = [
            ['type' => 'Vente', 'code' => 'sale'],
            ['type' => 'Location', 'code' => 'rent'],
            ['type' => 'Location vacances', 'code' => 'vacation_rental'],
        ];
        foreach ($transactions as $trans) {
            TypeTransaction::updateOrCreate(['code' => $trans['code']], $trans);
        }

        // 3. Morocco Geography
        $country = Country::firstOrCreate(['name' => 'Maroc'], ['name' => 'Maroc']);

        $regions = [
            'Tanger-Tétouan-Al Hoceïma' => ['Tanger', 'Tétouan', 'Al Hoceïma', 'Chefchaouen', 'Larache'],
            'L\'Oriental' => ['Oujda', 'Nador', 'Berkane', 'Driouch', 'Taourirt'],
            'Fès-Meknès' => ['Fès', 'Meknès', 'Taza', 'Ifrane', 'Sefrou'],
            'Rabat-Salé-Kénitra' => ['Rabat', 'Salé', 'Kénitra', 'Skhirat', 'Témara', 'Khémisset'],
            'Béni Mellal-Khénifra' => ['Béni Mellal', 'Khénifra', 'Azilal', 'Fquih Ben Salah'],
            'Casablanca-Settat' => ['Casablanca', 'Mohammadia', 'El Jadida', 'Settat', 'Berrechid'],
            'Marrakech-Safi' => ['Marrakech', 'Safi', 'Essaouira', 'El Kelaâ des Sraghna'],
            'Drâa-Tafilalet' => ['Errachidia', 'Ouarzazate', 'Midelt', 'Zagora'],
            'Souss-Massa' => ['Agadir', 'Inezgane', 'Aït Melloul', 'Tiznit', 'Taroudant'],
            'Guelmim-Oued Noun' => ['Guelmim', 'Tan-Tan', 'Sidi Ifni'],
            'Laâyoune-Sakia El Hamra' => ['Laâyoune', 'Boujdour', 'Smara'],
            'Dakhla-Oued Ed-Dahab' => ['Dakhla'],
        ];

        foreach ($regions as $regionName => $cities) {
            $reg = Region::firstOrCreate(
                ['name' => $regionName],
                ['name' => $regionName, 'country_id' => $country->id]
            );

            foreach ($cities as $cityName) {
                City::firstOrCreate(
                    ['name' => $cityName, 'region_id' => $reg->id],
                    ['name' => $cityName, 'region_id' => $reg->id]
                );
            }
        }
    }
}
