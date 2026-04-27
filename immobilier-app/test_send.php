<?php
use App\Models\User;
use App\Mail\HostAcceptedMail;
use Illuminate\Support\Facades\Mail;

try {
    $user = User::find(9);
    echo "Sending email to: " . $user->email . "\n";
    Mail::to($user->email)->send(new HostAcceptedMail($user));
    echo "SUCCESS: Email sent without exceptions.\n";
} catch (\Exception $e) {
    echo "FAILED: " . $e->getMessage() . "\n";
    echo $e->getTraceAsString();
}
