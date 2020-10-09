const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const compileJs = async () =>
  gulp
    .src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

const compileSass = async () =>
  gulp
    .src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'));

const copyHtml = async () => gulp.src('src/*.html').pipe(gulp.dest('build'));

const copyPhp = async () =>
  gulp.src('src/php/*.php').pipe(gulp.dest('build/php'));

const imageMin = () =>
  gulp.src('src/images/*').pipe(imagemin()).pipe(gulp.dest('build/images'));

exports.compileJs = compileJs;
exports.compileSass = compileSass;
exports.copyHtml = copyHtml;
exports.copyPhp = copyPhp;
exports.imageMin = imageMin;
