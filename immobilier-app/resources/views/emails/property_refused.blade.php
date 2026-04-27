<x-mail::message>
# Information concernant votre annonce

Bonjour,

Votre annonce pour le bien **"{{ $property->title }}"** n'a pas été validée par notre équipe.

Il se peut que certaines informations soient manquantes ou non conformes à nos conditions d'utilisation. Nous vous invitons à vérifier les détails de votre annonce dans votre espace hôte.

<x-mail::button :url="config('app.url') . '/host-space/realestates/' . $property->id">
Modifier mon annonce
</x-mail::button>

Cordialement,<br>
{{ config('app.name') }}
</x-mail::message>
