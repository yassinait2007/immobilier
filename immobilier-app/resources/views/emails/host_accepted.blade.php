<x-mail::message>
# Félicitations {{ $user->first_name }} !

Votre demande pour devenir hôte sur notre plateforme a été **validée** par notre équipe.

Vous pouvez maintenant accéder à votre espace hôte pour ajouter vos biens immobiliers et commencer à recevoir des réservations.

<x-mail::button :url="config('app.url') . '/host-space'">
Accéder à mon espace hôte
</x-mail::button>

Merci de votre confiance,<br>
{{ config('app.name') }}
</x-mail::message>
