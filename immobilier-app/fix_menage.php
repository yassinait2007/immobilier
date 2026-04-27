<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\ScheduledCharge;
use App\Models\Charge;

// Update to Thursday
$s = ScheduledCharge::find(1);
if ($s) {
    $s->recurrence_value = 'Jeudi';
    $s->save();
    echo "Scheduled charge '{$s->name}' updated to Jeudi.\n";

    // Manually create the charge for this week since yesterday was Thursday
    Charge::create([
        'name' => $s->name,
        'description' => $s->description . " (Généré rétroactivement pour le jeudi " . now()->subDay()->format('d/m') . ")",
        'amount' => $s->amount,
        'type' => $s->type,
        'status' => 'pending',
        'realestate_id' => $s->realestate_id,
    ]);
    echo "Charge '{$s->name}' has been created in your charges list.\n";
} else {
    echo "Scheduled charge not found.\n";
}
