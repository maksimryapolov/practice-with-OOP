const { series, src, dest, watch, lastRun, parallel } = require('gulp');

const debug                 = require('gulp-debug');
const soursemaps            = require('gulp-sourcemaps');
const concat                = require('gulp-concat');
const clean                 = require('gulp-clean-dir');
const browserSync           = require('browser-sync').create();
const svgSprite             = require('gulp-svg-sprite');

/* Styles sass */
const style                 = require('./tasks/style.js');

/* Page HTML */
const pug                   = require('gulp-pug');

/* Script js */
const lint                  = require('gulp-eslint');
const babel                 = require('gulp-babel');

function pages() {
    return src('./src/pages/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest('./dist/'))
}

function sprite() {
    return src('./src/images/svg/**.svg')
        .pipe(svgSprite({
            mode: {
                css: { // Activate the «css» mode
                    dest: '.',
                    render: {
                        scss: {} 
                    }
                }
            }
        }))
        .pipe(debug())
        .pipe(dest('./src/scss/sprites/'))
}

function svg() {
    return src('./src/scss/sprites/svg/*.svg')
        .pipe(dest('./dist/svg/'))
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

function resource() {
    return src('./src/images/**/*.{png,jpg,jpeg}')
    .pipe(dest('./dist/img/'));
}

function fonts() {
    return src('./src/fonts/*.*')
        .pipe(dest('./dist/fonts/'));
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
 
exports.default = series(sprite, svg, parallel(pages, style, script, resource, fonts), browser);