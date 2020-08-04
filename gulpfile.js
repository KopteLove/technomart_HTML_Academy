"use strict";

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('gulp-csso');
const minify = require('gulp-minify');
const server = require('browser-sync').create();
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('css', function () {
    return gulp.src('source/scss/style.scss')
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(sourcemap.write('.'))
        .pipe(gulp.dest('build/css'))
        .pipe(server.stream());
});

gulp.task('js', function () {
    return gulp.src('source/js/script.js')
        .pipe(minify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('build/js'))
});

gulp.task('images', function () {
    return gulp.src('source/img/**/*.{jpg, png, svg}')
        .pipe(imageMin([
            imageMin.optipng({optimizationLevel: 3}),
            imageMin.jpegtran({progressive: true}),
            imageMin.svgo()
        ]))
        .pipe(gulp.dest('source/img'));
});

gulp.task('webp', function () {
    return gulp.src('source/img/**/*.{jpg, png}')
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest('source/img'));
});

gulp.task('html', function () {
    return gulp.src('source/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
    return gulp.src([
        'source/fonts/**/*.*',
        'source/img/**',
        'source/js/*.min.js',
        'source/css/*.min.css',
    ], {
        base: 'source'
    })
        .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
    return del('build')
});

gulp.task('server', function () {
    server.init({
        server: 'build/',
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch('source/scss/**/*.scss', gulp.series('css', 'refresh'));
    gulp.watch('source/*.html', gulp.series('html', 'refresh'));
    gulp.watch('source/js/script.js', gulp.series('js', 'refresh'));
});

gulp.task('refresh', function (done) {
    server.reload();
    done();
});

gulp.task('build', gulp.series('clean', 'copy', 'css', 'js', 'html'));
gulp.task('start', gulp.series('build', 'server'));
