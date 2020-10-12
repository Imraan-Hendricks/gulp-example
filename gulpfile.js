const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');
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

const compileHtml = async () =>
  gulp
    .src('src/*.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('build'));

const copyPhp = async () =>
  gulp.src('src/php/*.php').pipe(gulp.dest('build/php'));

const imageMin = () =>
  gulp.src('src/images/*').pipe(imagemin()).pipe(gulp.dest('build/images'));

exports.compileHtml = compileHtml;
exports.compileJs = compileJs;
exports.compileSass = compileSass;
exports.copyPhp = copyPhp;
exports.imageMin = imageMin;
