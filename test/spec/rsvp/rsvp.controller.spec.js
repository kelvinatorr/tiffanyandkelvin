/**
 * Created by Kelvin on 6/28/2016.
 */
'use strict';
describe('Controller: RSVPCtrl', function () {
    // load the controller's module
    beforeEach(module('tiffanyAndKelvin'));
    beforeEach(module('templates'));

    var RSVPCtrl,
        scope,
        rootScope,
        deferred;

    var rsvpData = {
        data: {}
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        deferred = $q.defer();
        var promise = deferred.promise;
        rsvpData.save = function(formModel) {
            return promise;
        };

        rsvpData.pepe = 'test';

        RSVPCtrl = $controller('RSVPCtrl', {
            rsvpData: rsvpData
        });
        spyOn(rsvpData, 'save').and.callThrough();
        spyOn($.fn, 'removeClass');
    }));

    it('should initialize isSaving to false', function() {
        expect(RSVPCtrl.isSaving).toBe(false);
    });

    it('should initialize showCloseButton to true', function() {
        expect(RSVPCtrl.showCloseButton).toBe(true);
    });

    it('should initialize form to an empty object', function() {
        var expected = {};
        expect(RSVPCtrl.form).toEqual(expected);
    });

    it('should set formModel to be rsvpData.data', function() {
       expect(RSVPCtrl.formModel).toEqual(rsvpData.data);
    });

    it('should return whether a given property on form is dirty and invalid', function() {
        var element = 'foo';
        var idx = 'bar';
        RSVPCtrl.form.foobar = {
            $dirty: true,
            $invalid: false
        };
        var expected = false;
        var actual = RSVPCtrl.showErrors(element, idx);
        expect(actual).toBe(expected);
    });

    describe('closeToast', function() {
        it('should set showCloseButton to true when called', function() {
            RSVPCtrl.showCloseButton = false;
            RSVPCtrl.closeToast();
            expect(RSVPCtrl.showCloseButton).toBe(true);
        });

        it('should call removeClass with show-up', function() {
            RSVPCtrl.closeToast('success');
            expect($.fn.removeClass).toHaveBeenCalledWith('show-up');
        });
    });

    describe('submit', function() {
        var formModel =  {
            code: 'foo'
        };

        var mockForm = {
            $setPristine: function() {}
        };

        beforeEach(function() {
            RSVPCtrl.form = mockForm;
            RSVPCtrl.submit(formModel);
            spyOn($.fn, 'addClass');
            spyOn(mockForm, '$setPristine');
        });

        it('should call save on rsvpData', function() {
           expect(rsvpData.save).toHaveBeenCalledWith(formModel);
        });

        it('should set showThankYou to be true when successful', function() {
            deferred.resolve();
            scope.$apply();
            expect(RSVPCtrl.showThankYou).toBe(true);
        });

        it('should set atLeastOneGoing to false if not at least one person is going', function() {
            deferred.resolve();
            scope.$apply();
            expect(RSVPCtrl.atLeastOneGoing).toBe(false);
        });

        it('should set atLeastOneGoing to true if not at least one person is going', function() {
            deferred.resolve();
            scope.$apply();
            formModel = {
                "A0": {
                    "firstName": "Darbie",
                    "going": "0",
                    "lastName": "Grant",
                    "plusOne": false,
                    "plusOneDependent": false
                },
                "B1": {
                    "firstName": "Dave",
                    "going": "1",
                    "lastName": "Grant",
                    "plusOne": false,
                    "plusOneDependent": false
                },
                "C2": {
                    "firstName": "Natalie",
                    "going": "0",
                    "lastName": "Grant",
                    "plusOne": false,
                    "plusOneDependent": false
                },
                "responded": false
            };
            RSVPCtrl.submit(formModel);
            deferred.resolve();
            scope.$apply();
            expect(RSVPCtrl.atLeastOneGoing).toBe(true);
        });

        it('should set the from to pristine when successful', function() {
            deferred.resolve();
            scope.$apply();
            expect(mockForm.$setPristine).toHaveBeenCalled();
        });

        it('should call add class with show-up when not successful', function() {
            deferred.reject();
            scope.$apply();
            expect($.fn.addClass).toHaveBeenCalledWith('show-up');
        });

        it('should set showCloseButton false when not successful', function() {
            deferred.reject();
            scope.$apply();
            expect(RSVPCtrl.showCloseButton).toBe(false);
        });

        it('should set isSaving to true', function() {
            expect(RSVPCtrl.isSaving).toBe(true);
        });

        it('should set isSaving to false when the promise finishes', function() {
            deferred.reject();
            scope.$apply();
            expect(RSVPCtrl.isSaving).toBe(false);
        });
    });

    describe('goingChanged', function() {
       it('should not modify mainNotGoin person.plusOneDependent is false', function() {
           var expected = false;
           RSVPCtrl.mainNotGoing = expected;
           RSVPCtrl.goingChanged({plusOneDependent: false});
           expect(RSVPCtrl.mainNotGoing).toBe(expected);
       });

        it('should set mainNotGoing to person.going "0" === false or "1" === true', function () {
            var expected = true;
            var person = {
                plusOneDependent: true,
                going: '0'
            };
            RSVPCtrl.goingChanged(person);
            expect(RSVPCtrl.mainNotGoing).toBe(true);
        });
    });


});