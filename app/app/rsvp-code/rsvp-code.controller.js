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

        vm.invalidCode = null;

        vm.codeWatcher = codeWatcher;


        function codeWatcher(code) {
            if(vm.invalidCode) {
                if(code !== vm.invalidCode) {
                    vm.invalidCode = null;
                }
            }
        }

        function submit(formModel) {
            vm.isBusy = true;
            RSVPFactory.getData(formModel.code).then(function(result) {
                // show error message when null
                if(!result.data) {
                    vm.invalidCode = formModel.code;
                } else {
                    //TODO: go to rsvp state with code
                }
                vm.isBusy = false;
            });
        }
    }

})();