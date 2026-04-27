<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;
use App\Models\Booking;

$host = User::where('agence', true)->first();
if ($host) {
    echo "Host with Agence: " . $host->email . "\n";
    $bookings = Booking::whereHas('realestate', function($q) use ($host) {
        $q->where('host_id', $host->id);
    })->get();
    
    echo "Total bookings for this host: " . $bookings->count() . "\n";
    foreach ($bookings as $b) {
        echo "- Booking ID: " . $b->id . ", Amount: " . $b->amount . ", Type: " . ($b->type ? $b->type->code : 'N/A') . ", Status: " . ($b->status ? $b->status->code : 'N/A') . ", Date: " . $b->created_at . "\n";
    }
} else {
    echo "No host found with agence=true\n";
}
