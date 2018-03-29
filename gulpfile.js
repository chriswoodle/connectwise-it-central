'use strict';
const config = require('./gulp.config.js')();
const gulp = require('gulp-help')(require('gulp'));
const del = require('del');
const wiredep = require('wiredep').stream;
const browserSync = require('browser-sync');
const $ = require('gulp-load-plugins')({
    lazy: true
});
const colors = $.util.colors;

function log(msg) {
    if (typeof (msg) === 'object') {
        for (let item in msg)
            if (msg.hasOwnProperty(item))
                $.util.log(colors.cyan(msg[item]));
    } else
        $.util.log(colors.green(msg));
}

function plumberErrorHandler(err) {
    $.util.log(colors.red(err));
    this.emit('end'); // For gulp watch
}

gulp.task('teardown', 'Cleans bower_components.', function () {
    log('Tearing down…');
    return del(config.bower);
});

gulp.task('setup', 'Installs bower_components and builds application', function (callback) {
    log('Setting up…');
    $.sequence('bower', 'build', callback);
});

gulp.task('bower', false, function () {
    log('Installing bower components');
    return gulp.src('./bower.json')
        .pipe(require('gulp-install')());
});
 
gulp.task('clean', 'Cleans client directory.', function () {
    log('Cleaning: ' + colors.blue(config.client.all));
    return del(config.client.all);
});

gulp.task('debug', 'Builds, runs and watches application.', function (callback) {
    log('Running debug…');
    $.sequence('build', 'watch', 'browser-sync', 'nodemon', callback);
});

gulp.task('watch', 'Watches files for changes and builds accordingly.', function (callback) {
    gulp.watch([config.src.html, config.src.index], ['build-html']);
    gulp.watch(config.src.style.allScss, ['build-style']);
    gulp.watch(config.src.app, ['build-js']);
    gulp.watch([config.src.json, config.src.markdown], ['build-other']);
    gulp.watch([config.src.images, config.src.fonts], ['build-assets']);
    callback();
});

gulp.task('browser-sync', false, function (callback) {
    log('Running Browser-Sync');
    browserSync.init({
        proxy: "http://localhost:8080",
        reloadDelay: 2000,
        files: [config.globs.allClientFiles],
        port: 7000,
    });
    callback();
});

gulp.task('nodemon', false, function (callback) {
    return $.nodemon({
        script: './server/server.js',
        watch: './server',
    }).on('start', function () {
        log('Running Nodemon…');
        callback();
    });
});

const nodemon = require('nodemon');
process.once('SIGINT', function () {
    nodemon.once('exit', function () {
        process.exit();
    });
});

gulp.task('build', 'Builds application in development mode.', function (callback) {
    log('Building everything');
    $.sequence(['clean'], ['build-style', 'build-js', 'build-assets', 'build-other'], 'build-html', callback);
});

gulp.task('build-style', false, function () {
    log('Compiling SCSS -> CSS');
    let target = gulp.src(config.src.style.index);
    return target
        .pipe($.plumber({
            errorHandler: plumberErrorHandler
        }))
        .pipe($.sourcemaps.init())
        .pipe($.sassGlob())
        .pipe($.sass({
            errLogToConsole: true,
            includePaths: []
        }))
        .pipe($.sourcemaps.write({ includeContent: false })) // https://github.com/gulp-sourcemaps/gulp-sourcemaps/issues/60#issuecomment-220313018
        .pipe($.sourcemaps.init({ loadMaps: true }))
        .pipe($.autoprefixer({
            browsers: ['last 2 version', '>10%']
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(config.client.dir));
});

gulp.task('build-js', false, function () {
    log('Annotating and copying .js files');
    let jsSources = gulp.src(config.src.app);
    return jsSources
        .pipe($.plumber({
            errorHandler: plumberErrorHandler
        }))
        .pipe($.ngAnnotate({
            add: true,
            remove: true,
            single_quotes: true
        }))
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest(config.client.dir));
});

gulp.task('build-assets', false, function () {
    log('Building and copying asset files');
    let target = gulp.src([config.src.images, config.src.fonts]);
    return target
        .pipe($.plumber({
            errorHandler: plumberErrorHandler
        }))
        .pipe(gulp.dest(config.client.dir));
});

gulp.task('build-other', false, function () {
    log('Building and copying other files');
    let target = gulp.src([config.src.markdown, config.src.json]);
    return target
        .pipe($.plumber({
            errorHandler: plumberErrorHandler
        }))
        .pipe(gulp.dest(config.client.dir));
});

gulp.task('build-html', false, function (callback) {
    log('Injecting and copying .htm files');
    $.sequence('build-html-app', 'build-html-index', callback);
});

gulp.task('build-html-index', false, function () {
    let target = gulp.src(config.src.index);
    let appSource = gulp.src(config.client.inject, {
        cwd: config.client.dir,
        read: false
    }); // Load .js components in order

    return target
        .pipe($.plumber({
            errorHandler: function (err) {
                $.util.log(colors.red(err));
                process.exit(1);
            }
        }))
        .pipe(wiredep({
            ignorePath: /^(\/|\.+(?!\/[^\.]))+\.+/
        })) // inject bower deps
        .pipe($.inject(appSource, {
            relative: true,
            ignorePath: '../client'
        }))
        .pipe(gulp.dest(config.client.dir));
});

gulp.task('build-html-app', false, function () {
    let target = gulp.src(config.src.html);
    return target
        .pipe($.plumber({
            errorHandler: plumberErrorHandler
        }))
        .pipe(gulp.dest(config.client.dir));
});

