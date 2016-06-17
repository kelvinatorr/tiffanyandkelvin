/**
 * Created by Kelvin on 6/16/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .controller('RSVPCodeCtrl', RSVPCodeCtrl);

    function RSVPCodeCtrl() {
        var vm = this;

        console.log('test');

        vm.form = {};

        vm.formModel = {
            code: ''
        };

        vm.submit = submit;

        function submit(formModel) {
            console.log(formModel);
        }
    }

})();