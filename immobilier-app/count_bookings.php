<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Booking;

$count = Booking::whereHas('status', function($q) {
    $q->where('code', 'confirmed');
})->count();

echo "Confirmed bookings: " . $count . "\n";

$countPayed = Booking::whereHas('status', function($q) {
    $q->where('code', 'payed');
})->count();
echo "Payed bookings: " . $countPayed . "\n";
