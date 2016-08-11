(function(angular, window) {
    'use strict';
    angular.module('tiffanyAndKelvin')
        .controller('LandingCtrl', LandingCtrl);

    function LandingCtrl($scope, GoogleMapInit, $timeout, $uibModal) {
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

        vm.openEdytaGallery = openEdytaGallery;

        vm.openRenGallery = openRenGallery;

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

        function openEdytaGallery(idx) {
            var images =  [
                {id: 0, image: 'images/thumbnail-strip/0003-lrg.jpg'},
                {id: 1, image: 'images/thumbnail-strip/0020-lrg.jpg'},
                {id: 2, image: 'images/thumbnail-strip/0039-lrg.jpg'},
                {id: 3, image: 'images/thumbnail-strip/0051-lrg.jpg'},
                {id: 4, image: 'images/thumbnail-strip/0116-lrg.jpg'},
                {id: 5, image: 'images/thumbnail-strip/0147-lrg.jpg'}
            ];
            openGalleryModal(idx, images);
        }

        function openRenGallery(idx) {
            var images =  [
                {id: 0, image: 'images/engagement/_REN1339-Edit-lrg.jpg'},
                {id: 1, image: 'images/engagement/_REN1369-Edit-lrg.jpg'},
                {id: 2, image: 'images/engagement/_REN1656-lrg.jpg'},
                {id: 3, image: 'images/engagement/_REN1690-Edit-lrg.jpg'},
                {id: 4, image: 'images/engagement/_REN1708-Edit-lrg.jpg'},
                {id: 5, image: 'images/engagement/_REN1722-Edit-lrg.jpg'},
                {id: 6, image: 'images/engagement/_REN1788-lrg.jpg'},
                {id: 7, image: 'images/engagement/_REN1800-lrg.jpg'},
                {id: 8, image: 'images/engagement/_REN1853-Edit-lrg.jpg'}
            ];
            openGalleryModal(idx, images);
        }

        function openGalleryModal(idx, images) {
            $uibModal.open({
                animation: true,
                templateUrl: 'app/landing/gallery-modal.html',
                controller: 'GalleryModalCtrl',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    startIdx: function() {
                        return idx;
                    },
                    images: function () {
                        return images;
                    }
                }
            });
        }
    }
})(angular, window);