<?php

use App\Jobs\AddTransactions;
use App\Jobs\MarkBookingCompleted;
use App\Jobs\SendRappelToClientNotification;
use App\Jobs\ProcessScheduledCharges;
use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    /** @var ClosureCommand $this */
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(new ProcessScheduledCharges())->dailyAt("00:01");
Schedule::call(new AddTransactions())->everyFiveMinutes();
Schedule::call(new MarkBookingCompleted())->dailyAt("12:30");
Schedule::call(new SendRappelToClientNotification())->dailyAt("18:00");
