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

        function showErrors(element, idx) {
            var key = element + idx;
            return vm.form[key].$dirty && vm.form[key].$invalid;
        }

        function closeToast() {
            $('#success-notification').removeClass('show-up');
        }

        function submit(formModel) {
            rsvpData.save(formModel).then(function() {
                // show toast
                $('#success-notification').addClass('show-up');
            }).catch(function() {

            });
        }
    }
})();