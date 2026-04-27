<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Realstate;
use App\Models\User;

$p = Realstate::where('title', 'like', '%test%')->first();
if ($p) {
    echo "Property ID: " . $p->id . "\n";
    echo "Title: " . $p->title . "\n";
    echo "Host ID: " . $p->host_id . "\n";
    echo "Status: " . ($p->status ? $p->status->code : 'N/A') . "\n";
    echo "Review Status: " . ($p->reviewStatus ? $p->reviewStatus->code : 'N/A') . "\n";
    
    if ($p->host_id) {
        $host = User::find($p->host_id);
        if ($host) {
            echo "Host Email: " . $host->email . "\n";
        } else {
            echo "Host user not found for ID: " . $p->host_id . "\n";
        }
    } else {
        echo "No Host ID assigned to this property.\n";
    }
} else {
    echo "Property 'test' not found.\n";
}
