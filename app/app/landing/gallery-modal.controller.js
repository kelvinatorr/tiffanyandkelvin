/**
 * Created by Kelvin on 8/10/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .controller('GalleryModalCtrl', GalleryModalCtrl);

    function GalleryModalCtrl($uibModalInstance, startIdx, images) {
        var vm = this;

        vm.images = images;

        vm.startIdx = startIdx;

        vm.close = close;

        function close() {
            $uibModalInstance.close()
        }
    }
})();