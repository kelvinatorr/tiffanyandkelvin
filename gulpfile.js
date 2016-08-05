/**
 * Created by Kelvin on 8/4/2016.
 */
var gulp = require('gulp');
var del = require('del');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var gulpif = require('gulp-if');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');
var rev = require('gulp-rev');


// delete everything in the www folder
gulp.task('clean-dist', function () {
    return del([
        'dist/**/*'
    ]);
});

// copy over images, fonts and 3rd party css html
gulp.task('copy-files', function() {
    var imgs = gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'));

    // copy over css files
    var cssFiles = ['app/css/swipebox.css', 'app/css/style-v2.css', 'app/css/style-responsive-v2.css'];

    var css = gulp.src(cssFiles)
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));

    var preMinifiedCss = gulp.src('app/css/animate.min.css')
        .pipe(gulp.dest('dist/css'));

    var fonts = gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    // copy over urip js files
    var minifiedJSArray = ['app/js/minified/SmoothScroll.min.js', 'app/js/minified/classie.min.js',
        'app/js/minified/jquery.nav.min.js', 'app/js/minified/jquery.swipebox.min.js', 'app/js/minified/expandableGallery.min.js',
        'app/js/minified/jquery.counterup.min.js', 'app/js/minified/jquery-css-transform.min.js',
        'app/js/minified/jquery-animate-css-rotate-scale.min.js', 'app/js/minified/jquery.quicksand.min.js',
        'app/js/minified/headhesive.min.js', 'app/js/minified/scrollReveal.min.js',
        'app/js/minified/jquery.countdown.min.js'];

    var preMinifiedJS = gulp.src(minifiedJSArray)
        .pipe(gulp.dest('dist/js/minified'));

    var jsFiles = gulp.src(['app/js/modernizr.js', 'app/js/urip-v2.js', 'app/js/jquery.stellar.js'])
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

    var templates = gulp.src('app/app/**/*.html')
        .pipe(gulp.dest('dist/app'));

    return merge(imgs, css, preMinifiedCss,preMinifiedJS,jsFiles,templates, fonts);
});


gulp.task('build-html', function () {

    var condition = function(file) {
        var filesToRev = {
            'vendor.css': true,
            'app.js': true,
            'vendor.js': true,
            'app.css': true
        };
        return filesToRev[file.basename];
    };

    // TODO use template cache

    // concatenate, annotate, minify our vendor js files
    // concatenate, annotate, minify our js files
    return gulp.src("app/index.html")
        .pipe(useref())      // Concatenate with gulp-useref
        .pipe(gulpif('js/*.js',ngAnnotate()))
        .pipe(gulpif('js/*.js',uglify()))
        .pipe(gulpif('css/*.css', minifyCss())) // Minify vendor CSS sources
        .pipe(gulpif(condition, rev()))                // Rename the concatenated files
        .pipe(revReplace())         // Substitute in new filenames
        .pipe(gulp.dest('dist'));
});


gulp.task('build', function(callback) {
    runSequence('clean-dist',
        ['copy-files'],
        'build-html',
        callback);
});