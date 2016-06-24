/**
 * Created by Kelvin on 6/18/2016.
 */
(function(firebase) {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .factory('RSVPFactory', RSVPFactory);

    function RSVPFactory($q) {
        return {
            data: null,
            key: null,
            getData: getData
        };

        function getData(code) {
            var self = this;
            return $q(function(resolve, reject) {
                var ref = firebase.database().ref('codes/' + code);
                ref.on('value', function(snapshot) {
                    self.data = snapshot.val();
                    if(self.data) {
                        self.key = snapshot.key;
                        resolve(self);
                    } else {
                        reject(null);
                    }
                });
            });
        }
    }
})(firebase);