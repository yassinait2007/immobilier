<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Realstate;
use App\Filters\RealestateFilter;
use Illuminate\Http\Request;

$request = new Request(['typeTransaction' => 'rent']);
$data = Realstate::filter(new RealestateFilter($request))
    ->whereHas("status", function ($query) {
        $query->where("code", "=", "active");
    })
    ->whereHas("reviewStatus", function ($query) {
        $query->where("code", "=", "legal");
    })
    ->get();

echo "Rent count: " . $data->count() . "\n";

$request = new Request(['typeTransaction' => 'vacation_rental']);
$data = Realstate::filter(new RealestateFilter($request))
    ->whereHas("status", function ($query) {
        $query->where("code", "=", "active");
    })
    ->whereHas("reviewStatus", function ($query) {
        $query->where("code", "=", "legal");
    })
    ->get();

echo "Vacation rental count: " . $data->count() . "\n";
