/**
 * Created by Kelvin on 6/19/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .controller('RSVPCtrl', RSVPCtrl);

    function RSVPCtrl(rsvpData) {
        var vm = this;

        vm.formModel = rsvpData.data;

        vm.form = {};

        vm.isSaving = false;

        vm.submit = submit;

        vm.closeToast = closeToast;

        vm.showErrors = showErrors;

        vm.showCloseButton = true;

        vm.goingChanged = goingChanged;

        vm.mainNotGoing = false;

        function goingChanged(person) {
            if(!person.plusOneDependent) return;
            vm.mainNotGoing = person.going === '0';
        }

        function showErrors(element, idx) {
            var key = element + idx;
            return vm.form[key].$dirty && vm.form[key].$invalid;
        }

        function closeToast(status) {
            $('#' + status +'-notification').removeClass('show-up');
            vm.showCloseButton = true;
        }

        function submit(formModel) {
            vm.isSaving = true;
            rsvpData.save(formModel).then(function() {
                // show toast
                $('#success-notification').addClass('show-up');
            }).catch(function() {
                $('#error-notification').addClass('show-up');
            }).then(function() {
                vm.isSaving = false;
                vm.showCloseButton = false;
            });
        }
    }
})();