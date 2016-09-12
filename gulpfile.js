/**
 * Created by david-maser on 25/07/16.
 */

(function() {
  'use strict';
  var gulp, jshint, pump, sass, uglify;

  gulp = require('gulp');

  jshint = require('gulp-jshint');

  sass = require('gulp-sass');

  uglify = require('gulp-uglify');

  pump = require('pump');

  gulp.task('default', ['watch']);

  gulp.task('jshint', function() {
    return gulp.src('skeleton/js/*.js').pipe(jshint()).pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('watch', function() {
    gulp.watch('skeleton/js/*.js', ['jshint']);
  });

  gulp.task('sass', function() {
    return gulp.src('skeleton/scss/xo.scss').pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError)).pipe(gulp.dest('skeleton/dist/css'));
  });

  gulp.task('compress', function(cb) {
    var options;
    options = {
      preserveComments: 'license'
    };
    pump([gulp.src('skeleton/js/*.js'), uglify(), gulp.dest('skeleton/dist/js')], cb);
  });

  gulp.task('sass:watch', function() {
    gulp.watch('skeleton/scss/*.scss', ['sass']);
  });

}).call(this);

//# sourceMappingURL=gulpfile.js.map
