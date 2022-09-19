var gulp = require('gulp');
var less = require('gulp-less');
var gulpMultiProcess = require('gulp-multi-process');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

/* Task to compile less */
gulp.task('compile-less', function() {
    gulp.src('./src/less/navanjani.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css/'));
});

/* Task to watch less changes */
gulp.task('watch-less', function() {
    //gulp.watch('./src/less/**/*.less' , ['compile-less']);
    gulp.watch('./src/less/**/*.less', function () {
        gulpMultiProcess(['compile-less'], function () {})
    });
});

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./src/less/*.less").on("change", reload);
    gulp.watch("./index.html").on("change", reload);
});

/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'serve']);