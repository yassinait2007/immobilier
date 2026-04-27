<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Realstate;

$props = Realstate::with(['status', 'reviewStatus'])->get();
foreach ($props as $p) {
    echo "ID: " . $p->id . " | Title: " . $p->title . " | Status: " . ($p->status ? $p->status->code : 'NULL') . " | ReviewStatus: " . ($p->reviewStatus ? $p->reviewStatus->code : 'NULL') . "\n";
}
