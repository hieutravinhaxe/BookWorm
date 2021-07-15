const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.sass('resources/css/app.scss', 'public/css');
mix.js('resources/js/app.jsx', 'public/js').react();
// mix.js('resources/js/app.js', 'public/js')
//     .react()
//     .sass('resources/css/app.scss', 'public/css');

// mix.sass('resources/css/app.scss', 'public/css');
// mix.js('resources/js/app.jsx', 'public/js').react();

// mix.js('resources/js/app.js','public/js')
//     .react()
//     .version();