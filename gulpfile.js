const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const fileinclude = require('gulp-file-include');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

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

const compileJs = async () =>
  gulp
    .src('src/js/*.js')
    .pipe(plumber())
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: [
          [
            '@babel/env',
            {
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

const compileSass = async () =>
  gulp
    .src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());

const copyPhp = async () =>
  gulp.src('src/php/*.php').pipe(gulp.dest('build/php'));

const copyVendors = async () =>
  gulp.src('src/vendors/**/*').pipe(gulp.dest('build/vendors'));

const imageMin = () =>
  gulp.src('src/images/*').pipe(imagemin()).pipe(gulp.dest('build/images'));

const build = gulp.series(
  gulp.parallel(
    compileHtml,
    compileJs,
    compileSass,
    copyPhp,
    copyVendors,
    imageMin
  )
);

const watch = async () => {
  browserSync.init({ server: { baseDir: './build' } });
  gulp
    .watch(['src/*.html', 'src/markup/*.html'], compileHtml)
    .on('change', browserSync.reload);
  gulp.watch('src/js/*.js', compileJs).on('change', browserSync.reload);
  gulp.watch('src/sass/**/*.scss', compileSass);
  gulp.watch('src/php/*.php', copyPhp);
  gulp.watch('src/vendors/**/*', copyVendors);
  gulp.watch('src/images/*', imageMin);
};

exports.compileHtml = compileHtml;
exports.compileJs = compileJs;
exports.compileSass = compileSass;
exports.copyPhp = copyPhp;
exports.copyVendors = copyVendors;
exports.default = build;
exports.imageMin = imageMin;
exports.watch = watch;
