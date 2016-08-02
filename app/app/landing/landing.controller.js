(function(angular, window) {
    'use strict';
    angular.module('tiffanyAndKelvin')
        .controller('LandingCtrl', LandingCtrl);

    function LandingCtrl($scope, GoogleMapInit) {
        var vm = this;

        vm.mapsApiFailed = false;

        $scope.$on('$viewContentLoaded', function() {
            window.tak.runUripV2();
        });

        GoogleMapInit.mapsInitialized.then(function() {
            var directionsDisplay = new google.maps.DirectionsRenderer;
            var directionsService = new google.maps.DirectionsService;

            var mapDiv = document.getElementById('googleMap');
            var map = new google.maps.Map(mapDiv, {
                center: {lat: 36.115662, lng: -115.170364},
                zoom: 12
            });
            directionsDisplay.setMap(map);

            directionsService.route({
                origin: '3555 S Las Vegas Blvd, Las Vegas, NV 89109',
                destination: '8310 S Rainbow Blvd #100, Las Vegas, NV 89139',
                travelMode: 'DRIVING'
            }, function(response, status) {
                if (status === 'OK') {
                    console.log('got directions');
                    directionsDisplay.setDirections(response);
                } else {
                    // Show iframe instead
                    $scope.$apply(vm.mapsApiFailed = true);
                }
            });
        });
    }
})(angular, window);