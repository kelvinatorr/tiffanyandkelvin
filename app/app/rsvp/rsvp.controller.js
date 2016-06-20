/**
 * Created by Kelvin on 6/19/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .controller('RSVPCtrl', RSVPCtrl);

    function RSVPCtrl() {
        var vm = this;

        vm.formModel = {
            firstName: '',
            lastName: '',
            plusOneFirstName: '',
            plusOneLastName: ''
        };

        vm.form = {};

        vm.isSaving = false;

        vm.submit = submit;

        function submit(formModel) {

        }
    }
})();