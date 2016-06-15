/**
 * Created by Kelvin on 6/15/2016.
 */
(function() {
    'use strict';

    var app = angular.module('tiffanyAndKelvin', ['ui.router']);
    console.log('running0');

    app.config(['$compileProvider','$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', AppConfig]);

    function AppConfig($compileProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        console.log('running');
        $urlMatcherFactoryProvider.caseInsensitive(true);
        // ignore trailing slashes.
        $urlMatcherFactoryProvider.strictMode(false);
        console.log($stateProvider);
        $stateProvider
            .state('landing', {
                url: '/landing',
                templateUrl: 'app/landing/landing.html'
                //controller: 'KPIListCtrl',
                //controllerAs: 'vm',
                //resolve: {
                //    navTree: ['NavTree', function (NavTree) {
                //        return NavTree.init();
                //        //return true;
                //    }]
                //}
            })
            .state('rsvp-code', {
                //parent: 'kpis',
                url: '/rsvp-code',
                //template: '<p>Kelvinnnnnn</p>'
                templateUrl: 'app/rsvp-code/rsvp-code.html'
                //controller: 'FlowPatternCtrl',
                //controllerAs: 'vm',
                //resolve: {
                //    FlowPatterns: ['FlowPattern', '$stateParams', function (FlowPattern, $stateParams) {
                //        return FlowPattern.init($stateParams.kpiId);
                //    }]
                //}
            });

        $urlRouterProvider.otherwise('/rsvp-code');
        // Remove debug info when in production.
        if (window.location.host.split(':')[0] != 'localhost') $compileProvider.debugInfoEnabled(false);
    }

})();

