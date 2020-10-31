const $                     = require('gulp-load-plugins')();
const {  src, dest }        = require('gulp');
const sass                  = require('gulp-sass');
sass.compiler               = require('node-sass');

/* USE PLUGINS
const autoprefixer          = require('gulp-autoprefixer');
const cleanCss              = require('gulp-clean-css');
const urlAdjuster           = require('gulp-css-url-adjuster');
const soursemaps            = require('gulp-sourcemaps');
const clean                 = require('gulp-clean-dir');
*/

module.exports = function () {
    return src('./src/scss/style.scss')
        .pipe($.sourcemaps.init())
        .pipe(sass())
        .pipe($.autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            cascade: false
        }))
        .pipe($.cleanCss({ format: 'beautify' }))
        .pipe($.cssUrlAdjuster({
            replace: ['../images/', '../img/'],
        }))
        .pipe($.cssUrlAdjuster({
            replace: ['svg/', '../svg/'],
        }))
        .pipe($.cleanDir('./dist/css/'))
        .pipe($.sourcemaps.write())
        .pipe(dest('./dist/css/'))
};