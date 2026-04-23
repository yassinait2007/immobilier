<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Realstate;

$biens = Realstate::with(['status', 'reviewStatus'])->get();
echo "Total Biens: " . count($biens) . "\n";
foreach ($biens as $bien) {
    echo "ID: {$bien->id} | Title: {$bien->title} | Status: " . ($bien->status->code ?? 'N/A') . " | Review: " . ($bien->reviewStatus->code ?? 'N/A') . " | Deleted: {$bien->is_deleted}\n";
}

$activeLegal = Realstate::whereHas('status', function($q) { $q->where('code', 'active'); })
    ->whereHas('reviewStatus', function($q) { $q->where('code', 'legal'); })
    ->get();
echo "Active & Legal Count: " . count($activeLegal) . "\n";
