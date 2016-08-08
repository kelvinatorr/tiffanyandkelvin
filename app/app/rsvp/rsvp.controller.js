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
        angular.forEach(vm.formModel, function(val, key) {
            if(key !== 'responded') {
                vm.goingChanged(val);
            }
        });

        vm.showThankYou = false;

        vm.authCalendar = authCalendar;


        vm.atLeastOneGoing = undefined;

        function authCalendar() {
            console.log('huh');
            vm.calendarResult.displaySuccess = true;
        }

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
                // show thank you message
                vm.showThankYou = true;
                // see if we need to show the google calendar link
                vm.atLeastOneGoing = false;
                angular.forEach(formModel, function(val, key) {
                    if(key !== 'responded') {
                        if(val.going === '1' && !vm.mainNotGoing) {
                            vm.atLeastOneGoing = true;
                        }
                    }
                });
                vm.form.$setPristine();
            }).catch(function() {
                $('#error-notification').addClass('show-up');
                vm.showCloseButton = false;
            }).then(function() {
                vm.isSaving = false;
            });
        }
    }
})();