/**
 * Created by Kelvin on 6/15/2016.
 */
(function() {
    'use strict';

    var app = angular.module('tiffanyAndKelvin', ['ui.router']);

    app.config(['$compileProvider','$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', AppConfig]);

    function AppConfig($compileProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $urlMatcherFactoryProvider.caseInsensitive(true);
        // ignore trailing slashes.
        $urlMatcherFactoryProvider.strictMode(false);
        $stateProvider
            .state('landing', {
                url: '/main',
                templateUrl: 'app/landing/landing.html',
                controller: 'LandingCtrl',
                controllerAs: 'vm',
                onExit: function() {
                    if(window.tak.headhesive) {
                        window.tak.headhesive.destroy();
                    }
                }
            })
            .state('rsvp-code', {
                url: '/rsvp-code',
                templateUrl: 'app/rsvp-code/rsvp-code.html',
                controller: 'RSVPCodeCtrl',
                controllerAs: 'vm'
                //resolve: {
                //    FlowPatterns: ['FlowPattern', '$stateParams', function (FlowPattern, $stateParams) {
                //        return FlowPattern.init($stateParams.kpiId);
                //    }]
                //}
            })
            .state('rsvp', {
                url: '/rsvp/:code',
                templateUrl: 'app/rsvp/rsvp.html',
                controller: 'RSVPCtrl',
                controllerAs: 'vm',
                resolve: {
                    rsvpData: ['RSVPFactory', '$stateParams', function (RSVPFactory, $stateParams) {
                        if($stateParams.code === RSVPFactory.key) {
                            return RSVPFactory;
                        } else {
                            return RSVPFactory.getData($stateParams.code);
                        }
                    }]
                }
            });


        $urlRouterProvider.otherwise('/main');
        // Remove debug info when in production.
        if (window.location.host.split(':')[0] != 'localhost') $compileProvider.debugInfoEnabled(false);
    }

})();

