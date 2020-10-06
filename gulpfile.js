const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const compileJs = async () =>
  gulp
    .src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

const copyHtml = async () => gulp.src('src/*.html').pipe(gulp.dest('build'));

exports.compileJs = compileJs;
exports.copyHtml = copyHtml;
