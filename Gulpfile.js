/**
 * Created by asqwrd on 2/24/2016.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var findup = require('findup-sync');
//const css = findup('public/');
//console.log(css);

gulp.task('styles', function() {
    gulp.src('public/sass/**/*.scss')
       // .pipe(sass({includePaths: [css]}))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('public/sass/**/*.scss',['styles']);
    gulp.watch('public/app/**/*.scss',['styles']);
});
