"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var imageMin = require("gulp-imagemin");
var webp = require("gulp-webp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");
var server = require("browser-sync").create();
var del = require("del");
var htmlmin = require("gulp-htmlmin")

gulp.task("css", function () {
    return gulp.src("source/css/style.css")
        .pipe(plumber())
        .pipe(postcss([autoprefixer()]))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
        .pipe(server.stream());
});

gulp.task("js", function () {
    return gulp.src("source/js/script.js")
        .pipe(gulp.dest("build/js"))
});

gulp.task("images", function () {
    return gulp.src("source/img/**/*.{jpg, png, svg}")
        .pipe(imageMin([
            imageMin.optipng({optimizationLevel: 3}),
            imageMin.jpegtran({progressive: true}),
            imageMin.svgo()
        ]))
        .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
    return gulp.src("source/img/**/*.{jpg, png}")
        .pipe(webp({quality: 90}))
        .pipe(gulp.dest("source/img"));
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
    return gulp.src([
        "source/fonts/**/*.*",
        "source/img/**",
        "source/js/*.min.js",
        "source/css/*.min.css",
    ], {
        base: "source"
    })
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
    return del("build")
});

gulp.task("server", function () {
    server.init({
        server: "build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("source/css/**/*.{css,css}", gulp.series("css"));
    gulp.watch("source/*.html", gulp.series("html", "refresh"));
    gulp.watch("source/js/script.js", gulp.series("js", "refresh"));
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
});

gulp.task("build", gulp.series("clean", "copy", "css", "js", "html"));
gulp.task("start", gulp.series("build", "server"));
