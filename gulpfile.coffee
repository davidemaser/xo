###*
# Created by david-maser on 25/07/16.
###

'use strict'
gulp = require('gulp')
jshint = require('gulp-jshint')
sass = require('gulp-sass')
uglify = require('gulp-uglify')
pump = require('pump')
# define the default task and add the watch task to it
gulp.task 'default', [ 'watch' ]
# configure the jshint task
gulp.task 'jshint', ->
  gulp.src('skeleton/js/*.js').pipe(jshint()).pipe jshint.reporter('jshint-stylish')
# configure which files to watch and what tasks to use on file changes
gulp.task 'watch', ->
  gulp.watch 'skeleton/js/*.js', [ 'jshint' ]
  return
gulp.task 'sass', ->
  gulp.src('skeleton/scss/xo.scss').pipe(sass(outputStyle: 'compressed').on('error', sass.logError)).pipe gulp.dest('skeleton/dist/css')
gulp.task 'compress', (cb) ->
  options = preserveComments: 'license'
  pump [
    gulp.src('skeleton/js/*.js')
    uglify()
    gulp.dest('skeleton/dist/js')
  ], cb
  return
gulp.task 'sass:watch', ->
  gulp.watch 'skeleton/scss/*.scss', [ 'sass' ]
  return