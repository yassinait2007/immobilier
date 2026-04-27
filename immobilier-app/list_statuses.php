<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\BookingStatus;

foreach(BookingStatus::all() as $s) {
    echo $s->status . " (" . $s->code . ")\n";
}
