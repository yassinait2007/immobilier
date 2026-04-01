<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\UserType;
use App\Models\UserStatus;
use App\Models\RealstateCategory;
use App\Models\TypeTransaction;
use App\Models\RealstateEtat;
use App\Models\RealstateReviewStatus;
use App\Models\RealstateStatus;
use App\Models\BookingStatus;
use App\Models\TypeBooking;
use Spatie\Permission\Models\Role;
use App\Models\OperationType;
use App\Models\Country;
use App\Models\Region;
use App\Models\City;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ReferenceDataSeeder extends Seeder
{
    public function run(): void
    {
        // User Types
        $userTypes = [
            ['type' => 'Client', 'code' => 'client'],
            ['type' => 'Hôte', 'code' => 'host'],
        ];
        foreach ($userTypes as $ut) {
            UserType::firstOrCreate(['code' => $ut['code']], $ut);
        }

        // User Status
        $userStatuses = [
            ['status' => 'Actif', 'code' => 'active'],
            ['status' => 'Inactif', 'code' => 'inactive'],
        ];
        foreach ($userStatuses as $us) {
            UserStatus::firstOrCreate(['code' => $us['code']], $us);
        }

        // Real Estate Categories
        $categories = [
            ['category' => 'Appartement', 'code' => 'apartment'],
            ['category' => 'Villa', 'code' => 'villa'],
            ['category' => 'Studio', 'code' => 'studio'],
            ['category' => 'Commercial', 'code' => 'commercial'],
        ];
        foreach ($categories as $cat) {
            RealstateCategory::firstOrCreate(['code' => $cat['code']], $cat);
        }

        // Transaction Types
        $transactions = [
            ['type' => 'Vente', 'code' => 'sale'],
            ['type' => 'Location', 'code' => 'rent'],
        ];
        foreach ($transactions as $trans) {
            TypeTransaction::firstOrCreate(['code' => $trans['code']], $trans);
        }

        // Real Estate Etats
        $etats = [
            ['etat' => 'Neuf', 'code' => 'new'],
            ['etat' => 'Bon état', 'code' => 'good'],
            ['etat' => 'A rénover', 'code' => 'to-renovate'],
        ];
        foreach ($etats as $etat) {
            RealstateEtat::firstOrCreate(['code' => $etat['code']], $etat);
        }

        // Review Statuses
        $reviewStatuses = [
            ['status' => 'Légal', 'code' => 'legal'],
            ['status' => 'Illégal', 'code' => 'illegal'],
            ['status' => 'En cours', 'code' => 'in-review'],
        ];
        foreach ($reviewStatuses as $rs) {
            RealstateReviewStatus::firstOrCreate(['code' => $rs['code']], $rs);
        }

        // Real Estate Statuses
        $realstateStatuses = [
            ['status' => 'Actif', 'code' => 'active'],
            ['status' => 'En attente', 'code' => 'pending'],
            ['status' => 'En pause', 'code' => 'paused'],
        ];
        foreach ($realstateStatuses as $rss) {
            RealstateStatus::firstOrCreate(['code' => $rss['code']], $rss);
        }

        // Booking Statuses
        $bookingStatuses = [
            ['status' => 'Payé', 'code' => 'payed'],
            ['status' => 'En attente', 'code' => 'pending'],
            ['status' => 'Rejeté', 'code' => 'rejected'],
            ['status' => 'Confirmé', 'code' => 'confirmed'],
        ];
        foreach ($bookingStatuses as $bs) {
            BookingStatus::firstOrCreate(['code' => $bs['code']], $bs);
        }

        // Type Bookings
        $typeBookings = [
            ['type' => 'Realworld', 'code' => 'realworld'],
            ['type' => 'Direct', 'code' => 'direct'],
        ];
        foreach ($typeBookings as $tb) {
            TypeBooking::firstOrCreate(['code' => $tb['code']], $tb);
        }

        // Roles
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'managers']);

        // Operation Types
        $operationTypes = [
            ['type' => 'Transfert', 'code' => 'transfert'],
        ];
        foreach ($operationTypes as $ot) {
            OperationType::firstOrCreate(['code' => $ot['code']], $ot);
        }

        // Geography
        $country = Country::firstOrCreate(['name' => 'Maroc'], ['name' => 'Maroc']);
        $region = Region::firstOrCreate(['name' => 'Souss-Massa'], ['name' => 'Souss-Massa', 'country_id' => $country->id]);
        $city = City::firstOrCreate(['name' => 'Agadir'], ['name' => 'Agadir', 'region_id' => $region->id]);

        // Agence User
        User::firstOrCreate(
            ['email' => 'agence@immobilier.com'],
            [
                'first_name' => 'Agence',
                'last_name' => 'Immobilier',
                'password' => Hash::make('password123'),
                'agence' => true,
                'email_verified_at' => now(),
                'type_id' => UserType::where('code', 'host')->first()->id,
                'status_id' => UserStatus::where('code', 'active')->first()->id,
                'city_id' => $city->id,
            ]
        );
    }
}
