<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$u = User::find(8);
if ($u) {
    echo "User ID: " . $u->id . "\n";
    echo "Email: " . $u->email . "\n";
    echo "Type Code: " . ($u->type ? $u->type->code : 'N/A') . "\n";
} else {
    echo "User 8 not found\n";
}
