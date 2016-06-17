(function(angular, window) {
    'use strict';
    angular.module('tiffanyAndKelvin')
        .controller('LandingCtrl', LandingCtrl);

    function LandingCtrl($scope) {
        $scope.$on('$viewContentLoaded', function() {
            window.tak.runUripV2();
        });
    }
})(angular, window);