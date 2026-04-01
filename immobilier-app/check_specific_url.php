<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Realstate;

$realstate = Realstate::where('title', 'like', '%appartement%')->where('price', 200)->first();
if ($realstate) {
    echo "ID: " . $realstate->id . "\n";
    $media = $realstate->getMedia('images')->first();
    if ($media) {
        echo "getUrl(): " . $media->getUrl() . "\n";
        echo "path: " . $media->getPath() . "\n";
        echo "exists: " . (file_exists($media->getPath()) ? "YES" : "NO") . "\n";
    } else {
        echo "No media found for this Realstate\n";
    }
} else {
    echo "No matching Realstate found\n";
}
