/**
 * Created by Kelvin on 8/1/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .factory('GoogleMapInit', GoogleMapInit);

    function GoogleMapInit($q, $window) {
        // maps loader deferred object
        var mapsDefer = $q.defer();

        // Google's url for async maps initialization accepting callback function
        var asyncUrl = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDn4kt1AKRUYUuFG76W4motG74HPFClEuw&callback=';

        // async loader
        var asyncLoad = function(asyncUrl, callbackName) {
            var script = document.createElement('script');
            //script.type = 'text/javascript';
            script.src = asyncUrl + callbackName;
            document.body.appendChild(script);
        };

        // callback function - resolving promise after maps successfully loaded
        $window.googleMapsInitialized = function () {
            mapsDefer.resolve();
        };

        // loading google maps
        asyncLoad(asyncUrl, 'googleMapsInitialized');

        return {
            // usage: Initializer.mapsInitialized.then(callback)
            mapsInitialized : mapsDefer.promise
        };
    }
})();