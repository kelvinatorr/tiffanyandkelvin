/**
 * Created by Kelvin on 8/11/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .directive('keyboardControls', keyboardControls);

    function keyboardControls() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element[0].tabIndex = 1000;
                var keydownHandler = debounce(function(e) {
                    if(e.keyCode === 39) {
                        // to the right
                        e.preventDefault();
                        if(scope.vm.images.length > scope.vm.startIdx + 1) {
                            scope.$apply(scope.vm.startIdx += 1);
                        }
                    } else if(e.keyCode === 37) {
                        // to the left
                        e.preventDefault();
                        if(-1 < scope.vm.startIdx - 1) {
                            scope.$apply(scope.vm.startIdx += -1);
                        }
                    }
                }, 400);

                element[0].addEventListener('keydown', keydownHandler);

                function debounce(func, wait, immediate) {
                    if(scope.testing) return func;
                    var timeout;
                    return function() {
                        var context = this, args = arguments;
                        var later = function() {
                            timeout = null;
                            if (!immediate) func.apply(context, args);
                        };
                        var callNow = immediate && !timeout;
                        clearTimeout(timeout);
                        timeout = setTimeout(later, wait);
                        if (callNow) func.apply(context, args);
                    };
                }
            }
        };
    }
})();