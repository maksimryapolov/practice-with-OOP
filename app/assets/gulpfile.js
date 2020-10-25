const { series, src, dest, watch, lastRun, parallel } = require('gulp');

const debug                 = require('gulp-debug');
const soursemaps            = require('gulp-sourcemaps');
const concat                = require('gulp-concat');
const clean                 = require('gulp-clean-dir');
const browserSync           = require('browser-sync').create();

/* Styles sass */
const sass                  = require('gulp-sass');
const autoprefixer          = require('gulp-autoprefixer');
const cleanCss              = require('gulp-clean-css');
const urlAdjuster           = require('gulp-css-url-adjuster');

/* Page HTML */
const pug                   = require('gulp-pug');

/* Script js */
const lint                  = require('gulp-eslint');
const babel                 = require('gulp-babel');

sass.compiler = require('node-sass');

function pages() {
    return src('./src/pages/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('./dist/'))
}

function style() {
    return src('./src/scss/style.scss')
        .pipe(soursemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
           overrideBrowserslist: ['last 10 version'],
           cascade: false
        }))
        .pipe(cleanCss({ format: 'beautify' }))
        .pipe(urlAdjuster({
            replace: ['../images/', '../img/'],
          }))
        .pipe(clean('./dist/css/'))
        .pipe(soursemaps.write())
        .pipe(dest('./dist/css/'))
}

function script() {
    return src([
        'node_modules/jquery/dist/jquery.min.js',
        './src/scripts/index.js'
    ])
    .pipe(soursemaps.init())
    .pipe(concat('index.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(clean('./dist/js/'))
    .pipe(soursemaps.write())
    .pipe(dest('./dist/js/'));
}

function resourse() {
    return src('./src/images/**/*.*')
    .pipe(dest('./dist/img/'));
}

function browser(bc) {
    browserSync.init({
        server: './dist/'
    });

    watch('./src/pages/**/*.pug', series(pages)).on('change', browserSync.reload);
    watch('./src/scss/**/*.scss', series(style)).on('change', browserSync.reload);
    watch('./src/scripts/**/*.js', series(script)).on('change', browserSync.reload);

    return bc();
}
 
exports.default = series(parallel(pages, style, script, resourse), browser);