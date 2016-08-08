(function(angular, window) {
    'use strict';
    angular.module('tiffanyAndKelvin')
        .controller('LandingCtrl', LandingCtrl);

    function LandingCtrl($scope, GoogleMapInit, $timeout) {
        var vm = this;

        var fixOurStory = function() {
            var listItems = $('.how-it-works-li');
            var maxHeight = undefined;
            listItems.each(function() {
                var currentItem = $(this);
                if(!maxHeight ||currentItem.outerHeight() > maxHeight) {
                    maxHeight = currentItem.outerHeight();
                }
            });

            listItems.each(function() {
                var currentItem = $(this);
                if(currentItem.outerHeight() !== maxHeight) {
                    currentItem.css('min-height', maxHeight + 'px');
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

            fixOurStory();
        });

        $(window).resize(fixOurStory);
    }
})(angular, window);