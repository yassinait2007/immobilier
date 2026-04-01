@php
    $documentsProvided = explode(';', $booking->client->documents);
    $title = null;
    if (!empty($type)) {
        $title = $type == 'extend' ? 'Pronlenger' : 'Raccourcir';
    }

@endphp

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>BULLETIN D'HÉBERGEMENT</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11px;
            padding: 7px;
        }

        .container {
            border: 2px solid #5B5B9E;
            padding: 8px;
        }

        .header {
            margin-bottom: 5px;
            overflow: hidden;
        }

        .header-left {
            float: left;
            width: 70%;
        }

        .header-right {
            float: right;
            width: 30%;
            text-align: right;
        }

        .contract-id {
            color: #d32f2f;
            /* red */
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 3px;
        }

        .create-at {
            color: #666;
            font-size: 9px;
        }

        .logo {
            max-width: 180px;
            max-height: 70px;
        }

        .agency-name {
            color: #5B5B9E;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }





        .agency-subtitle {
            color: #666;
            font-size: 10px;
            margin-bottom: 3px;
        }

        .clear {
            clear: both;
        }

        .bulletin-title {
            background-color: #5B5B9E;
            color: white;
            text-align: center;
            padding: 8px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .form-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 5px;
        }

        .form-table td {
            padding: 5px;
            border-bottom: 1px solid #ddd;
        }

        .form-label-en {
            width: 25%;
            font-weight: bold;
            color: #333;
            vertical-align: top;
            text-align: left;
            font-size: 10px;
        }

        .form-value {
            width: 50%;
            color: #000;
            text-align: center;
            vertical-align: top;
            font-size: 11px;
        }

        .form-label-ar {
            width: 25%;
            font-weight: bold;
            color: #333;
            vertical-align: top;
            text-align: right;
            direction: rtl;
            font-size: 11px;
        }

        .checkbox-section {
            margin: 5px 0;
            padding: 5px 0;
            border-bottom: 1px solid #ddd;
        }

        .checkbox-label {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 11px;
        }

        .checkbox-item {
            display: inline-block;
            margin-right: 10px;
            font-size: 10px;
        }

        .terms-section {
            background-color: #5B5B9E;
            color: white;
            text-align: center;
            padding: 5px;
            font-weight: bold;
            margin: 15px 0 5px 0;
            font-size: 12px;
        }

        .terms-content {
            font-size: 9px;
            line-height: 1.5;
            margin-bottom: 6px;
            text-align: justify;
        }

        .terms-content-ar {
            font-size: 10px;
            line-height: 1.6;
            margin-bottom: 6px;
            direction: rtl;
            text-align: right;
        }



        .signature-table {
            width: 100%;
            margin-top: 4px;
            border-collapse: collapse;
        }

        .signature-table td {
            width: 50%;
            text-align: center;
            vertical-align: bottom;
            padding: 5px;
        }

        .signature-img {
            display: block;
            max-width: 150px;
            max-height: 80px;
            border: 1px solid #ddd;
            padding: 5px;
            margin: 3px auto 0 auto;

        }

        .signature-title {
            font-weight: bold;
        }

        .manager-info {
            margin-top: 7px;
        }

        .manager-name {
            font-weight: bold;
            font-size: 11px;
        }

        .manager-phone {
            font-size: 10px;
            color: #666;
            margin-top: 3px;
        }

        .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 2px solid #5B5B9E;
            font-size: 9px;
            overflow: hidden;
        }

        .footer-left {
            float: left;
            width: 65%;
        }

        .footer-right {
            float: right;
            width: 30%;
            text-align: right;
        }

        .old-value {
            text-decoration: line-through;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="header-left">
                @if ($logo)
                    <img src="{{ $logo }}" alt="Logo" class="logo">
                @endif
                <div class="agency-name">{{ $agence->first_name }} {{ $agence->last_name }}</div>
                <div class="agency-subtitle">YOUR EXPERT IN SHORT-TERM STAYS</div>
            </div>
            <div class="header-right">
                <div class="contract-id">{{ 'N°-' . str_pad($booking->id, 4, '0', STR_PAD_LEFT) }}</div>
                @if (empty($title))
                    <div class="create-at">{{ \Carbon\Carbon::parse($booking->created_at)->format('d/m/Y H:i') }}</div>
                @else
                    <div class="type-contract">{{ $title }}</div>
                    <div class="create-at">{{ now()->format('d/m/Y H:i') }}</div>
                @endif
            </div>
        </div>

        <!-- Title -->
        <div class="bulletin-title">BULLETIN D'HÉBERGEMENT</div>

        <!-- Client Information -->
        <table class="form-table">
            <tr>
                <td class="form-label-en">Full Name:</td>
                <td class="form-value">{{ $booking->client->first_name }} {{ $booking->client->last_name }}</td>
                <td class="form-label-ar">الاسم الكامل:</td>
            </tr>
            <tr>
                <td class="form-label-en">Number of guests:</td>
                <td class="form-value">{{ $booking->nb_guest }}</td>
                <td class="form-label-ar">عدد الضيوف:</td>
            </tr>
            @if ($isPrivate)
                <tr>
                    <td class="form-label-en">Phone number:</td>
                    <td class="form-value">{{ $booking->client->tel }}</td>
                    <td class="form-label-ar">رقم الهاتف:</td>
                </tr>
            @endif
            <tr>
                <td class="form-label-en">Date of Entry:</td>
                <td class="form-value">{{ \Carbon\Carbon::parse($booking->checkin)->format('d/m/Y') }}</td>
                <td class="form-label-ar">تاريخ الدخول:</td>
            </tr>
            <tr>
                <td class="form-label-en">Date and Time of Departure:</td>
                <td class="form-value">
                    @if (!empty($oldCheckout))
                        <span class="old-value">{{ \Carbon\Carbon::parse($oldCheckout)->format('d/m/Y') }}</span>
                    @endif
                    <span>{{ \Carbon\Carbon::parse($booking->checkout)->format('d/m/Y') . ' 12:00' }}</span>
                </td>
                <td class="form-label-ar">تاريخ وتوقيت المغادرة:</td>
            </tr>
            @if ($isPrivate)
                <tr>
                    <td class="form-label-en">Night Price:</td>
                    <td class="form-value">{{ number_format($booking->night_price, 2, '.') }} MAD</td>
                    <td class="form-label-ar">سعر الليلة:</td>
                </tr>
                <tr>
                    <td class="form-label-en">Total:</td>
                    <td class="form-value">
                        @if (!empty($oldTotal))
                            <span class="old-value">{{ number_format($oldTotal, 2, '.') }}</span>
                        @endif
                        {{ number_format($booking->amount, 2, '.') }} MAD
                    </td>
                    <td class="form-label-ar">المجموع:</td>
                </tr>
            @endif
            <tr>
                <td class="form-label-en">Address:</td>
                <td class="form-value">{{ $booking->realestate->city->name }} - {{ $booking->realestate->address }}
                </td>
                <td class="form-label-ar">عنوان العقار:</td>
            </tr>
            <tr>
                <td class="form-label-en">Marital Status:</td>
                <td class="form-value">{{ $booking->type_guest }}</td>
                <td class="form-label-ar"> الفئة المستفيدة:</td>
            </tr>
        </table>

        <!-- ID Type -->
        <div class="checkbox-section">
            <div class="checkbox-label">Type of ID Provided - نوع الهوية المقدمة:</div>

            @forelse($documentsProvided as $doc)
                @if (!empty($doc))
                    <span class="checkbox-item">☑ {{ $doc }}</span>
                @endif
            @empty
                <p>No documents provided - لم يتم تقديم وثائق</p>
            @endforelse
        </div>

        <!-- Terms -->
        <div class="terms-section">Terms and Guidelines - الشروط والإرشادات</div>

        <!-- English Terms -->
        <div class="terms-content">
            • The guest or resident is committed to using the apartment in an ethical and responsible manner, and must
            refrain from any activities that may raise suspicion, cause damage to the property, or disturb the
            neighbors.
        </div>

        <div class="terms-content">
            • The use of the apartment for any illegal or unethical purposes is strictly prohibited, such as drug use,
            hosting parties, or receiving unauthorized individuals.
        </div>

        <div class="terms-content">
            • The guest or resident must return the key at the end of the agreed period, no later than 12:00 PM.
        </div>

        <div class="terms-content">
            • In the event that the guest or resident violates any of the contract terms related to the ethical use of
            the apartment, they shall bear full financial and moral responsibility, and shall cover all costs resulting
            from such violation.
        </div>


        <!-- Arabic Terms -->
        <div class="terms-content-ar">
            • يلتزم النزيل أو المقيم باستخدام الشقة بطريقة أخلاقية ومسؤولة، وعدم القيام بأي أنشطة تؤدي إلى الشبهات أو
            إتلاف الممتلكات أو إزعاج الجيران.
        </div>

        <div class="terms-content-ar">
            • يُمنع استخدام الشقة لأي أغراض غير قانونية أو غير أخلاقية، مثل تعاطي المخدرات أو تنظيم الحفلات أو استقبال
            أشخاص غير مصرح بهم.
        </div>

        <div class="terms-content-ar">
            • يلتزم النزيل أو المقيم بتسليم المفتاح عند انتهاء الفترة المتفق عليها، في موعد أقصاه الساعة 12:00 زوالًا.
        </div>

        <div class="terms-content-ar">
            • في حالة انتهاك النزيل أو المقيم لأي من بنود العقد المتعلقة بالاستخدام الأخلاقي للشقة، يتحمل المسؤولية
            المادية والمعنوية الكاملة، ويتحمل جميع التكاليف الناتجة عن هذا الانتهاك.
        </div>


        <!-- Signatures -->
        <table class="signature-table">
            <tr>
                <td>
                    <div class="signature-title">Client Signature - إمضاء المقيم</div>
                    @if ($signature)
                        <br>
                        <img src="{{ $signature }}" alt="Client Signature" class="signature-img">
                    @endif
                </td>


                <td>
                    <div class="signature-title">Agent de réservation</div>
                    <div class="manager-info">
                        <div class="manager-name">{{ $manager->first_name }} {{ $manager->last_name }}</div>
                        <div class="manager-phone">{{ $manager->phone }}</div>
                    </div>
                </td>
            </tr>
        </table>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-left">
                <strong>Phone :</strong> {{ $agence->tel ?? '' }}<br>
                <strong>Address :</strong> {{ $agence->address ?? '' }}<br>
                <strong>Email :</strong> {{ $agence->email ?? '' }}
            </div>

            <div class="clear"></div>
        </div>
    </div>
</body>

</html>
