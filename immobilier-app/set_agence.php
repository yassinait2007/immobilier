<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

$u = User::where('email', 'dragon2007118@gmail.com')->first();
if ($u) {
    $u->agence = true;
    $u->save();
    echo "User dragon2007118@gmail.com is now an Agence\n";
} else {
    echo "User not found\n";
}
