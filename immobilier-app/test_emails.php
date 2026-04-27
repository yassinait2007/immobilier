<?php
$users = App\Models\User::where('identity_status', 'valid')->orderBy('id', 'desc')->take(3)->get(['id', 'email', 'identity_status']);
echo json_encode($users, JSON_PRETTY_PRINT);
