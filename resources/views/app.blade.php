<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Hasina\'s Magic Kitchen') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Favicons -->

        <link rel="apple-touch-icon" sizes="180x180" href={{asset("favicon_io/apple-touch-icon.png")}}>
        <link rel="icon" type="image/png" sizes="32x32" href={{asset("favicon_io/favicon-32x32.png")}}>
        <link rel="icon" type="image/png" sizes="16x16" href={{asset("favicon_io/favicon-16x16.png")}}>
        <link rel="manifest" href={{asset("favicon_io/site.webmanifest")}}>


        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
