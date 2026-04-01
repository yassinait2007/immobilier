<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Feature;

$features = [
    ['name' => 'Wi-Fi', 'description' => 'Connexion internet haut débit'],
    ['name' => 'Climatisation', 'description' => 'Air conditionné'],
    ['name' => 'Ascenseur', 'description' => 'Accès par ascenseur'],
    ['name' => 'Parking', 'description' => 'Place de stationnement'],
    ['name' => 'Piscine', 'description' => 'Accès à une piscine'],
    ['name' => 'Cuisine équipée', 'description' => 'Cuisine avec électroménager'],
    ['name' => 'Terrasse', 'description' => 'Espace extérieur privé'],
    ['name' => 'Vue sur mer', 'description' => 'Vue panoramique sur la mer'],
    ['name' => 'Gardiennage', 'description' => 'Sécurité 24h/24'],
    ['name' => 'Meublé', 'description' => 'Logement entièrement meublé'],
    ['name' => 'Chauffage', 'description' => 'Chauffage central ou individuel'],
    ['name' => 'Balcon', 'description' => 'Petit espace extérieur'],
];

foreach ($features as $f) {
    Feature::updateOrCreate(['name' => $f['name']], $f);
}

echo "Features seeded successfully!\n";
