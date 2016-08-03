/**
 * Created by Kelvin on 8/2/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .directive('inputUppercase', inputUppercase);

    function inputUppercase() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, elem, attrs, ctrl) {

                ctrl.$parsers.unshift(function (viewValue) {
                    elem.val(viewValue.toUpperCase());
                    return viewValue.toUpperCase();
                });
            }
        };
    }
})();