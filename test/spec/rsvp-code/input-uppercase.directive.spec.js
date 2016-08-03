/**
 * Created by Kelvin on 8/2/2016.
 */
'use strict';
describe('Directive: inputUppercase', function() {
    // load the directive's module
    beforeEach(module('tiffanyAndKelvin'));
    beforeEach(module('templates'));

    var element,
        scope;

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should uppercase the input value', inject(function ($compile) {
        element = angular.element('<input ng-model="hello" input-uppercase/>');
        element = $compile(element)(scope);
        element.val('Some text');
        element.triggerHandler('input');
        var expected = 'SOME TEXT';
        var actual = element.val();
        expect(actual).toEqual(expected);
    }));
});
