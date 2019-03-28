var gulp = require('gulp'),
    concat = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    pug = require('gulp-pug'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    notify = require("gulp-notify"),
    zip = require('gulp-zip');

// HTML Task
gulp.task('html', function () {

    return gulp.src('projects/index.pug')
            .pipe(pug({pretty: true}))
            .pipe(concat('index.html'))
            .pipe(gulp.dest('dist'))
            .pipe(livereload());
});

// CSS Task
gulp.task('css', function () {

    return gulp.src('projects/css/**/*.scss')
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(prefix('last 2 versions'))
            .pipe(concat('main.css'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/css'))
            .pipe(livereload());
});


// JS Task
gulp.task('scripts', function () {

    return gulp.src(['projects/Js/*.js', '!projects/Js/two.js'])
            .pipe(concat('scripts.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/Js'))
            .pipe(livereload());
});

// Compress Task
gulp.task('compress', function () {

    return gulp.src('dist/**/*.*')
            .pipe(zip('task.zip'))
            .pipe(gulp.dest('.'))
            .pipe(notify('Files Is Compressed'))
});

// Watch Task
gulp.task('watch', function() {
    require('./server.js');
    livereload.listen();
    gulp.watch('projects/index.pug', gulp.series('html'));
    gulp.watch('projects/css/**/*.scss', gulp.series('css'));
    gulp.watch('projects/Js/*.js', gulp.series('scripts'));
    gulp.watch('dist/**/*.*', gulp.series('compress'));
});

// Defualt Task
gulp.task('default', gulp.series('watch'));