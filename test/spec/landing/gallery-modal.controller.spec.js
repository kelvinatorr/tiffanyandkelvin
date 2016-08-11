/**
 * Created by Kelvin on 8/11/2016.
 */
'use strict';

describe('Controller: GalleryModalCtrl', function () {
    // load the controller's module
    beforeEach(module('tiffanyAndKelvin'));

    var GalleryModalCtrl,
        scope,
        rootScope;

    var mock$uibModalInstance = {
        close: function() {}
    };

    var startIdx = 5;

    var images = [
        {id: 2, image: 'Hello World'}
    ];

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        rootScope = $rootScope;
        scope = $rootScope.$new();
        GalleryModalCtrl = $controller('GalleryModalCtrl', {
            $uibModalInstance: mock$uibModalInstance,
            startIdx: startIdx,
            images: images
        });
        spyOn(mock$uibModalInstance, 'close');
    }));

    it('should call $uibModalInstance close', function() {
        GalleryModalCtrl.close();
        expect(mock$uibModalInstance.close).toHaveBeenCalled();
    });

    it('should set startIdx to the startIdx passed in', function() {
        var actual = GalleryModalCtrl.startIdx;
        expect(startIdx).toEqual(actual);
    });

    it('should set images to the images passed in', function() {
        var actual = GalleryModalCtrl.images;
        expect(images).toEqual(actual);
    });


});