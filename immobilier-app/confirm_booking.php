<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Booking;
use App\Models\BookingStatus;

$b = Booking::find(15);
if ($b) {
    $status = BookingStatus::where('code', 'confirmed')->first();
    $b->status_id = $status->id;
    $b->save();
    echo "Booking 15 confirmed (Status: " . $status->status . ")\n";
} else {
    echo "Booking 15 not found\n";
}
