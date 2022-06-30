<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="base-link" content="{{ asset('storage/assets') }}">
    <meta name="base-url" content="{{ asset('') }}">
    <meta name="current-route" content="{{ Request::url() }}">

    <title>{{ config('app.name', 'Discount Checker') }}</title>


    <!-- Scripts -->
    <script src="{{ mix('js/scripts.js', false) }}" defer></script>
    <script src="{{ mix('js/app.js', false) }}" defer></script>
    <script
        src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
        crossorigin="anonymous"></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="shortcut icon" href="{{ asset('favicon.jpg') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon.jpg') }}">
    <link rel="shortcut icon" sizes="32x32" href="{{ asset('favicon.jpg') }}">
    <link rel="shortcut icon" sizes="16x16" href="{{ asset('favicon.jpg') }}">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
        <link href="{{ mix('css/app.css') }}" rel="stylesheet">
        <link href="{{ mix('css/styles.css') }}" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossorigin="anonymous">
    <link rel="stylesheet" href="https://unpkg.com/vue-spinners@1.0.0/dist/vue-spinners.css">

    <style>
        .layoutStyle{
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999;
        }

        .counters{
            list-style-type: none;
        }
        .counters .counter-content{
            display: block;
            text-align: center;
            color: #fff;
        }
        .counters .counter-content i{
            font-size: 36px;
        }
        .counters .counter-content h3{
            font-size: 32px;
            margin: 10px 0;
            color: #fff;
            font-weight: 700;
        }
        .counters .counter-content h4{
            font-size: 14px;
            margin: 0;
        }

        /*styles from app.scss*/
        .aboutSectionText::first-letter{
            color: var(--v-primary-base);
            padding: 0 .3rem;
            margin: 0 .3rem 0 0;
            border: 2px solid;
            border-radius: 8px;
            font-family: "IBM Plex Mono", monospace;
            font-size: 4rem;
            float: left;
            line-height: 1;
        }
        .card-npp{
            background-color: var(--v-primary-base);
            color: white;
        }
        .card-npp-small{
            background-color: var(--v-red-base);
            min-height: 5px !important;
            height: 5px !important;
        }

        /* v-vpshow classes */
        .before-enter {
            opacity: 0;
        }

        .enter {
            transition: opacity 5s ease;
            animation: bounce; /* referring directly to the animation's @keyframe declaration */
            animation-duration: 2s; /* don't forget to set a duration! */
        }

        .ernest {
            color: red;
            padding: 100px;

        }
        .webMasterDiv {
            width: 90% !important;
            margin-left: 10%;
        }

        /* .dropdown-toggle::after {
            content: none !important;
        } */

        @media (min-width: 1367px) {
            .webMasterDiv {
                width: 1367px !important;
                margin: 0 auto;
            }
        }
        /* ---------------- */


    </style>
    @yield('style')
</head>
<body>
    <div id="app">
       <v-app>
           @include('layouts.navbar')
           @yield('content')
       </v-app>
    </div>

    <!-- Bootstrap core JS-->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Core theme JS-->
    <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
    @yield('script')
</body>
</html>
