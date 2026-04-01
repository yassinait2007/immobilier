<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Feature;

$features = Feature::all();
foreach ($features as $f) {
    echo "ID: " . $f->id . " | Name: " . $f->name . "\n";
}
