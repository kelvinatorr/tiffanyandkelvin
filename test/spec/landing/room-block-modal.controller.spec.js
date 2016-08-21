/**
 * Created by Kelvin on 8/20/2016.
 */
'use strict';

describe('Controller: RoomBlockModalCtrl', function () {
    // load the controller's module
    beforeEach(module('tiffanyAndKelvin'));

    var RoomBlockModalCtrl;

    var mock$uibModalInstance = {
        close: function() {}
    };

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller) {
        //rootScope = $rootScope;
        //scope = $rootScope.$new();
        RoomBlockModalCtrl = $controller('RoomBlockModalCtrl', {
            $uibModalInstance: mock$uibModalInstance
        });
        spyOn(mock$uibModalInstance, 'close');
    }));

    it('should call $uibModalInstance close', function() {
        RoomBlockModalCtrl.close();
        expect(mock$uibModalInstance.close).toHaveBeenCalled();
    });
});