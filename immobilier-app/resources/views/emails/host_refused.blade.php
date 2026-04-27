<x-mail::message>
# Bonjour {{ $user->first_name }},

Nous avons examiné votre demande pour devenir hôte. Malheureusement, nous ne pouvons pas l'accepter pour le moment.

Si vous pensez qu'il s'agit d'une erreur ou si vous souhaitez fournir des informations complémentaires, n'hésitez pas à nous contacter.

<x-mail::button :url="config('app.url') . '/contact'">
Nous contacter
</x-mail::button>

Cordialement,<br>
{{ config('app.name') }}
</x-mail::message>
