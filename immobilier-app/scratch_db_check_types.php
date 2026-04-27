<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Realstate;

$props = Realstate::with(['type'])->get();
foreach ($props as $p) {
    echo "ID: " . $p->id . " | Title: " . $p->title . " | TypeCode: " . ($p->type ? $p->type->code : 'NULL') . "\n";
}
