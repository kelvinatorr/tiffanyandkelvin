/**
 * Created by Kelvin on 6/28/2016.
 */
'use strict';

describe('Controller: LandingCtrl', function () {
    // load the controller's module
    beforeEach(module('tiffanyAndKelvin'));

    var LandingCtrl,
        scope,
        rootScope;

    beforeEach(module(function($provide) {
        //$provide.value('FirebaseFactory', {
        //    database: mockDatabase
        //});

        $provide.factory('GoogleMapInit', function($q) {
            var defer = $q.defer();
            return {
                mapsInitialized: defer.promise
            }
        });
    }));


    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        LandingCtrl = $controller('LandingCtrl', {
            $scope: scope
        });
        window.tak = window.tak || {};
        window.tak.runUripV2 = function() {};
        spyOn(window.tak, 'runUripV2');
    }));

    it('should run urip when $viewContentLoaded', function() {
        //window.tak.runUripV2();
        rootScope.$broadcast('$viewContentLoaded');
        expect(window.tak.runUripV2).toHaveBeenCalled();
    });

    it('should initialize mapsApiFailed to false', function() {
        expect(LandingCtrl.mapsApiFailed).toBe(false);
    });
});