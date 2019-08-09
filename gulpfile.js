'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

gulp.task('style', function() {
  gulp
    .src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest('source/css'))
    .pipe(server.stream());
});

gulp.task('serve', ['style'], function() {
  server.init({
    server: 'source/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/*.html').on('change', server.reload);
});

gulp.task('deploy', function() {
  return gulp.src('./source/**/*').pipe(ghPages());
});
