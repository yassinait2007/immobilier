<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Realstate;
use App\Models\User;
use App\Models\Booking;

echo "Users count: " . User::count() . "\n";
echo "Properties count: " . Realstate::count() . "\n";
echo "Bookings count: " . Booking::count() . "\n";

$props = Realstate::limit(5)->get();
foreach ($props as $p) {
    echo " - Property: " . $p->title . " (Status: " . ($p->status ? $p->status->code : 'N/A') . ")\n";
}
