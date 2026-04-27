<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$u = User::find(8);
if ($u) {
    echo "User ID 8: " . $u->email . "\n";
    echo "Agence: " . ($u->agence ? 'Yes' : 'No') . "\n";
} else {
    echo "User 8 not found\n";
}
