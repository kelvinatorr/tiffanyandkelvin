/**
 * Created by Kelvin on 8/11/2016.
 */
'use strict';
describe('Directive: keyboardControls', function () {

    // load the directive's module
    beforeEach(module('tiffanyAndKelvin'));

    var element,
        scope,
        eventObj;

    beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope = {
            testing: true, // turns off the debounce function
            vm: {
                startIdx: 2,
                images: [0,1,2,3,4]
            },
            $apply: function() {}
        };
        element = angular.element('<div keyboard-controls></div>');
        element = $compile(element)(scope);
        eventObj = document.createEvent('Events');
        eventObj.initEvent('keydown', true, true);
    }));

    it('should increment startIdx by one if the right keyboard button is pressed', function () {
        eventObj.keyCode = 39;
        eventObj.which = 39;
        element[0].dispatchEvent(eventObj);
        expect(scope.vm.startIdx).toBe(3);
    });

    it('should not increment startIdx by one if the right keyboard button is pressed', function () {
        scope.vm.startIdx = 4;
        eventObj.keyCode = 39;
        eventObj.which = 39;
        element[0].dispatchEvent(eventObj);
        expect(scope.vm.startIdx).toBe(4);
    });

    it('should decrement startIdx by one if the left keyboard button is pressed', function () {
        eventObj.keyCode = 37;
        eventObj.which = 37;
        element[0].dispatchEvent(eventObj);
        expect(scope.vm.startIdx).toBe(1);
    });

    it('should not decrement startIdx by one if the left keyboard button is pressed', function () {
        scope.vm.startIdx = 0;
        eventObj.keyCode = 37;
        eventObj.which = 37;
        element[0].dispatchEvent(eventObj);
        expect(scope.vm.startIdx).toBe(0);
    });
});
