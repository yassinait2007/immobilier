<?php

namespace App\Jobs;

use App\Models\Booking;
use App\Models\WhatsappMessage;
use Illuminate\Support\Facades\Log;
use WasenderApi\WasenderClient;

class SendRappelToClientNotification
{


    public function __invoke()
    {
        Log::info("cron job (" . static::class . ") executed successfully at- " . now());
        $phones = Booking::with('client')
            ->whereDate('checkout', today()->addDay())
            ->get()
            ->pluck('client.tel')
            ->filter()
            ->map(fn($phone) => str_replace('+', '', $phone))
            ->values();

        $whatsapMesage = WhatsappMessage::where("code", "client-leaving-reminder")->first();
        $message = $whatsapMesage->message;

        $wa = new WasenderClient(config("services.whatsapp.wasender_key"));
        foreach ($phones as $phone) {
            if (!empty($phone)) {
                $wa->sendText($phone, $message);
            }
        }
    }
}
