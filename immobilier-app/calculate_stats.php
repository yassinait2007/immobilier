<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Booking;
use Illuminate\Support\Carbon;

$dtFrom = Carbon::now()->subDays(7)->startOfDay();
$dtTo = Carbon::now()->endOfDay();

$totalPlatform = Booking::whereHas('realestate.host', function ($query) {
    $query->where("agence", true);
})
    ->whereHas('status', function ($query) {
        $query->whereIn('code', ['payed', 'completed']);
    })
    ->whereHas('type', function ($query) {
        $query->where("code", "platform");
    })
    ->whereBetween('created_at', [$dtFrom, $dtTo])
    ->sum('amount');

echo "Total Platform Revenue (Last 7 Days): " . $totalPlatform . " MAD\n";

// Break down by day
$results = Booking::select(Illuminate\Support\Facades\DB::raw("DATE_FORMAT(created_at, '%Y-%m-%d') as period"), Illuminate\Support\Facades\DB::raw('SUM(amount) as total'))
    ->whereHas('realestate.host', function ($query) {
        $query->where("agence", true);
    })
    ->whereHas('status', function ($query) {
        $query->whereIn('code', ['payed', 'completed']);
    })
    ->whereHas('type', function ($query) {
        $query->where("code", "platform");
    })
    ->whereBetween('created_at', [$dtFrom, $dtTo])
    ->groupBy('period')
    ->get();

foreach ($results as $row) {
    echo $row->period . ": " . $row->total . " MAD\n";
}
