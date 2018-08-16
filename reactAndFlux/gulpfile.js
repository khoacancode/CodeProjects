"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //runs a local dev server
var open = require('gulp-open');  //open a url in a web browser
var browserify = require('browserify'); //bundle js
var reactify = require('reactify'); //transforms react jsx to js
var source = require('vinyl-source-stream'); // use conventional text stream with gulp
var concat = require('gulp-concat');

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*.html',
        js: './src/**/*.js', //look in subdirectory for js too
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
        ],
        dist: './dist',
        mainJs: './src/main.js'
    }
};

//start a local dev server
gulp.task('connect', function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], function () {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/' }));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function () {
    browserify(config.paths.mainJs)
        .transform(reactify) //compiling jsx
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js')) 
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function(){
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(config.paths.dist +'/css'));
});

gulp.task('watch', function () {
    gulp.watch(config.paths.html, ['html']); //rerun html task
    gulp.watch(config.paths.js, ['js']); //rerun html task
});

gulp.task('default', ['html', 'js', 'css',  'open', 'watch']);
