/**
 * Created by Kelvin on 8/10/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .controller('GalleryModalCtrl', GalleryModalCtrl);

    function GalleryModalCtrl($uibModalInstance, startIdx, images, $timeout) {
        var vm = this;

        vm.images = images;

        vm.startIdx = startIdx;

        vm.close = close;

        vm.swipe = swipe;

        $timeout(function() {
            $('.carousel-indicators').remove();
        });

        function swipe(direction) {
            var currentIdx = vm.startIdx;
            if(direction === 'right') {
                if(currentIdx - 1 > -1) {
                    vm.startIdx += -1;
                }
            } else {
                if(currentIdx + 1 < vm.images.length) {
                    vm.startIdx += 1;
                }
            }
        }


        function close() {
            $uibModalInstance.close()
        }
    }
})();