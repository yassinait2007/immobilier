<x-mail::message>
# Votre annonce est en ligne !

Félicitations, votre bien immobilier **"{{ $property->title }}"** a été validé par notre équipe et est maintenant visible par tous les utilisateurs.

Vous pouvez consulter votre annonce en cliquant sur le bouton ci-dessous :

<x-mail::button :url="config('app.url') . '/realestates/' . $property->id">
Voir mon annonce
</x-mail::button>

Bonnes réservations,<br>
{{ config('app.name') }}
</x-mail::message>
