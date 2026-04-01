<?php

namespace Database\Seeders;

use App\Models\Manager;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'create_property', 'update_property',
            'create_reservation', 'extend_reservation', 'reduce_reservation',
            'confirm_checkout', 'confirm_checkin', 'view_reservations',
            'create_owner', 'update_owner', 'view_owners',
            'finish_cleaning',
            'create_charge', 'view_charges',
            'create_client', 'update_client', 'view_clients',
            'view_users', 'create_user',
            'view_available_properties', 'view_reserved_properties',
            'view_cleaning_properties', 'view_today_checkouts',
            'view_reports', 'create_report',
            'view_reclamations', 'create_reclamation', 'close_reclamation',
            'view_slider', 'create_slider', 'activate_slider',
            'activate_announce', 'cancel_announce',
            'view_stats',
            'view_contract', 'create_contract',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'managers']);
        }

        $role = Role::firstOrCreate(['name' => 'super-admin', 'guard_name' => 'managers']);
        $role->syncPermissions(Permission::where('guard_name', 'managers')->get());

        $manager = Manager::firstOrCreate(
            ['email' => 'admin@immobilier.com'],
            [
                'first_name' => 'Admin',
                'last_name'  => 'Admin',
                'password'   => Hash::make('password123'),
                'phone'      => '0600000000',
            ]
        );

        $manager->assignRole($role);

        $this->command->info('Admin created: admin@immobilier.com / password123');
    }
}
