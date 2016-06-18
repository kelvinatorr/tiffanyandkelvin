/**
 * Created by Kelvin on 6/16/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .controller('RSVPCodeCtrl', RSVPCodeCtrl);

    function RSVPCodeCtrl(RSVPFactory) {
        var vm = this;

        vm.form = {};

        vm.formModel = {
            code: ''
        };

        vm.submit = submit;

        vm.isBusy = false;

        vm.invalidCode = false;

        function submit(formModel) {
            vm.isBusy = true;
            RSVPFactory.getData(formModel.code).then(function(result) {
                // show error message when null
                if(!result.data) {
                    vm.invalidCode = true;
                } else {
                    //TODO: go to rsvp state with code
                }
                vm.isBusy = false;
            });
        }
    }

})();