// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html

module.exports = function(config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            "jasmine"
        ],

        // list of files / patterns to load in the browser
        files: [
            'https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js',
            // bower:js
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-loader.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js',
            'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular-animate.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.1/angular-ui-router.min.js',
            'https://www.gstatic.com/firebasejs/live/3.0/firebase.js',
            'bower_components/angular-mocks/angular-mocks.js',
            // endbower
            'app/js/ui-bootstrap/ui-bootstrap-custom-tpls-2.0.1.min.js',
            "app/app/**/*.js",
            //"test/mock/**/*.js",
            "test/spec/**/*.js",
            "app/app/**/*.html"
        ],

        // list of files / patterns to exclude
        exclude: [
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "app/app/**/*.html": ['ng-html2js']
        },
        //
        ngHtml2JsPreprocessor: {
            // prepend this to the
            //prependPrefix: 'views/',
            stripPrefix: 'app/',
            moduleName: "templates"
        },

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            "PhantomJS"
        ],

        // Which plugins to enable
        plugins: [
            "karma-phantomjs-launcher",
            "karma-jasmine",
            "karma-ng-html2js-preprocessor"
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};

