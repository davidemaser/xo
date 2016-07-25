/**
 * Created by david-maser on 25/07/16.
 */
'use strict';
var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
    return gulp.src('skeleton/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
    gulp.watch('skeleton/js/*.js', ['jshint']);
});

gulp.task('sass', function () {
    return gulp.src('skeleton/sass/xo.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('skeleton/dist/css'));
});

gulp.task('compress', function (cb) {
    var options = {
        preserveComments: 'license'
    };
    pump([
            gulp.src('skeleton/js/*.js'),
            uglify(),
            gulp.dest('skeleton/dist/js')
        ],
        cb
    );
});

gulp.task('sass:watch', function () {
    gulp.watch('skeleton/sass/*.scss', ['sass']);
});