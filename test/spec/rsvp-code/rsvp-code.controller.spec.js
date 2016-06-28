/**
 * Created by Kelvin on 6/28/2016.
 */
'use strict';
describe('Controller: RSVPCodeCtrl', function () {
    // load the controller's module
    beforeEach(module('tiffanyAndKelvin'));
    beforeEach(module('templates'));

    var RSVPCodeCtrl,
        scope,
        rootScope,
        deferred;

    var rsvpFactory = {};

    var state = {
        go: function(name, args) {
            console.log(name);
        }
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, $q) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        deferred = $q.defer();
        var promise = deferred.promise;
        //var resolvedValue;
        rsvpFactory.getData = function() {
            return promise;
        };

        RSVPCodeCtrl = $controller('RSVPCodeCtrl', {
            RSVPFactory: rsvpFactory,
            $state: state
        });
        spyOn(state, 'go');
    }));

    it('should initialize isBusy to false', function() {
        expect(RSVPCodeCtrl.isBusy).toBe(false);
    });

    it('should initialize invalidCode to null', function() {
        expect(RSVPCodeCtrl.invalidCode).toBe(null);
    });

    it('should initialize formModel to have a code property', function() {
        var expected = {
            code: ''
        };
        expect(RSVPCodeCtrl.formModel).toEqual(expected);
    });

    it('should initialize form to an empty object', function() {
        var expected = {};
        expect(RSVPCodeCtrl.form).toEqual(expected);
    });

    it('should not change invalidCode if it is null', function() {
        var expected = null;
        var code = 'test';
        RSVPCodeCtrl.invalidCode = null;
        RSVPCodeCtrl.codeWatcher(code);
        expect(RSVPCodeCtrl.invalidCode).toBe(expected)
    });

    it('should change invalidCode to null if it does not match the code', function() {
        var expected =  'hello';
        var code = 'test';
        RSVPCodeCtrl.invalidCode = expected;
        RSVPCodeCtrl.codeWatcher(code);
        expect(RSVPCodeCtrl.invalidCode).toBe(null);
    });

    it('should not change invalidCode to null if it does match the code', function() {
        var expected =  'test';
        var code = 'test';
        RSVPCodeCtrl.invalidCode = expected;
        RSVPCodeCtrl.codeWatcher(code);
        expect(RSVPCodeCtrl.invalidCode).toBe(expected);
    });

    describe('submit', function() {
        var formModel =  {
            code: 'foo'
        };

        beforeEach(function() {
            RSVPCodeCtrl.submit(formModel);
        });

        it('should call state go with rsvp and the formModel code when successful', function() {
            deferred.resolve();
            scope.$apply();
            expect(state.go).toHaveBeenCalledWith('rsvp', {code: formModel.code});
        });

        it('should set invalidCode to the formModel code when unsuccessful', function() {
            deferred.reject();
            scope.$apply();
            expect(RSVPCodeCtrl.invalidCode).toEqual(formModel.code);
        });

        it('should set isBusy to true', function() {
            expect(RSVPCodeCtrl.isBusy).toBe(true);
        });

        it('should set isBusy to false when the promise finishes', function() {
            deferred.reject();
            scope.$apply();
            expect(RSVPCodeCtrl.isBusy).toBe(false);
        });
    });


});