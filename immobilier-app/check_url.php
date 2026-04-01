<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Realstate;

$realstate = Realstate::first();
if ($realstate) {
    $media = $realstate->getMedia('images')->first();
    if ($media) {
        echo "getUrl(): " . $media->getUrl() . "\n";
        echo "original_url attr: " . ($media['original_url'] ?? 'NULL') . "\n";
    } else {
        echo "No media found for first Realstate\n";
    }
} else {
    echo "No Realstate found in database\n";
}
