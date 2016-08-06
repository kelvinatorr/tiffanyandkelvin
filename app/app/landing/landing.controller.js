(function(angular, window) {
    'use strict';
    angular.module('tiffanyAndKelvin')
        .controller('LandingCtrl', LandingCtrl);

    function LandingCtrl($scope, GoogleMapInit, $timeout) {
        var vm = this;

        var fixHowItWorksLis = function() {
            var howItWorksLis = $('.how-it-works-li');
            var maxHowItWorksLiHeight = undefined;
            howItWorksLis.each(function() {
                var currentLi = $(this);
                if(!maxHowItWorksLiHeight || maxHowItWorksLiHeight < currentLi.outerHeight()) {
                    maxHowItWorksLiHeight = currentLi.outerHeight();
                }
            });

            howItWorksLis.each(function() {
                var currentLi = $(this);
                if(currentLi.outerHeight() !== maxHowItWorksLiHeight) {
                    currentLi.css('min-height', maxHowItWorksLiHeight);
                }
            });
        };

        vm.mapsApiFailed = false;

        $scope.$on('$viewContentLoaded', function() {
            window.tak.runUripV2();
            GoogleMapInit.mapsInitialized.then(function() {
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var directionsService = new google.maps.DirectionsService;

                // make the map after the digest cycle is complete
                $timeout(function() {
                    var mapDiv = document.getElementById('googleMap');
                    var map = new google.maps.Map(mapDiv, {
                        center: {lat: 36.115662, lng: -115.170364},
                        zoom: 12,
                        scrollwheel: false
                    });
                    directionsDisplay.setMap(map);
                    directionsDisplay.setPanel(document.getElementById('right-panel'));

                    directionsService.route({
                        origin: '3555 S Las Vegas Blvd, Las Vegas, NV 89109',
                        destination: '8310 S Rainbow Blvd #100, Las Vegas, NV 89139',
                        travelMode: 'DRIVING'
                    }, function(response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                        } else {
                            // Show iframe instead
                            $scope.$apply(vm.mapsApiFailed = true);
                        }
                    });
                });
            });

            fixHowItWorksLis();
        });

        $(window).resize(fixHowItWorksLis);
    }
})(angular, window);