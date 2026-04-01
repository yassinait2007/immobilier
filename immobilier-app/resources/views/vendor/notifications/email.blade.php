<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>{{ $subject ?? 'Notification' }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .email-container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }

        .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #1a73e8;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }

        .footer {
            margin-top: 30px;
            font-size: 13px;
            color: #999999;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <h2>{{ 'Bonjour' }}</h2>


        <p>Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse e-mail. </p>


        @isset($actionText)
            <p style="text-align: center; margin: 30px 0;">
                <a href="{{ $actionUrl }}" class="btn">Vérifier l'adresse e-mail</a>
            </p>
        @endisset


        <p> Si vous n’avez pas créé de compte, aucune autre action n’est requise.</p>


        <p>{{ 'Cordialement,' }}<br>{{ config('app.name') }}</p>

        @isset($actionText)
            <p class="footer">
                Si vous avez des difficultés à cliquer sur le bouton « {{ $actionText }} », copiez et collez l’URL
                suivante dans votre navigateur :<br>
                <a href="{{ $actionUrl }}">{{ $actionUrl }}</a>
            </p>
        @endisset
    </div>
</body>

</html>
