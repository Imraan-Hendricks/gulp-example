const gulp = require('gulp');

const copyHtml = async () => gulp.src('src/*.html').pipe(gulp.dest('build'));

exports.copyHtml = copyHtml;
