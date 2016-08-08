/**
 * Created by Kelvin on 6/16/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .controller('RSVPCodeCtrl', RSVPCodeCtrl);

    function RSVPCodeCtrl(RSVPFactory, $state) {
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
            RSVPFactory.getData(formModel.code).then(function() {
                $state.go('rsvp', {code: formModel.code});
            }).catch(function() {
                // show error message when null
                vm.invalidCode = formModel.code;
            }).then(function() {
                vm.isBusy = false;
            });
        }
    }

})();