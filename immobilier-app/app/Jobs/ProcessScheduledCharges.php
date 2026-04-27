<?php

namespace App\Jobs;

use App\Models\Charge;
use App\Models\ScheduledCharge;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;

class ProcessScheduledCharges
{
    public function __invoke()
    {
        Log::info("Executing ProcessScheduledCharges job at " . now());

        $today = Carbon::now();
        $dayNameFr = $this->getDayNameFr($today);
        $dayOfMonth = $today->day;

        $scheduledCharges = ScheduledCharge::all();

        foreach ($scheduledCharges as $scheduled) {
            $shouldCreate = false;

            if ($scheduled->recurrence_type === 'weekly') {
                if (strtolower($scheduled->recurrence_value) === strtolower($dayNameFr)) {
                    $shouldCreate = true;
                }
            } elseif ($scheduled->recurrence_type === 'monthly') {
                if ((int)$scheduled->recurrence_value === (int)$dayOfMonth) {
                    $shouldCreate = true;
                }
            }

            if ($shouldCreate) {
                // Check if already created today to avoid duplicates
                $exists = Charge::where('realestate_id', $scheduled->realestate_id)
                    ->where('name', $scheduled->name)
                    ->where('amount', $scheduled->amount)
                    ->whereDate('created_at', $today->toDateString())
                    ->exists();

                if (!$exists) {
                    Charge::create([
                        'name' => $scheduled->name,
                        'description' => $scheduled->description,
                        'amount' => $scheduled->amount,
                        'type' => $scheduled->type,
                        'status' => 'pending',
                        'realestate_id' => $scheduled->realestate_id,
                    ]);
                    Log::info("Created charge '{$scheduled->name}' for realestate {$scheduled->realestate_id}");
                }
            }
        }
    }

    private function getDayNameFr(Carbon $date)
    {
        $days = [
            'Sunday' => 'Dimanche',
            'Monday' => 'Lundi',
            'Tuesday' => 'Mardi',
            'Wednesday' => 'Mercredi',
            'Thursday' => 'Jeudi',
            'Friday' => 'Vendredi',
            'Saturday' => 'Samedi',
        ];

        return $days[$date->format('l')];
    }
}
