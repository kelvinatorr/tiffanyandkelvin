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

    var startIdx = 0;

    var images = [
        {id: 1, image: 'Foo Bar'},
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

    it('should add one to the startIdx if swipe left is called and we are not at the end', function() {
        GalleryModalCtrl.swipe('left');
        expect(GalleryModalCtrl.startIdx).toBe(1);
    });

    it('should not add one to the startIdx if swipe left is called and we are at the end', function() {
        GalleryModalCtrl.startIdx = 1;
        GalleryModalCtrl.swipe('left');
        expect(GalleryModalCtrl.startIdx).toBe(1);
    });

    it('should add one to the startIdx if swipe left is called and we are not at the end', function() {
        GalleryModalCtrl.swipe('right');
        expect(GalleryModalCtrl.startIdx).toBe(0);
    });

    it('should add one to the startIdx if swipe left is called and we are not at the end', function() {
        GalleryModalCtrl.startIdx = 1;
        GalleryModalCtrl.swipe('right');
        expect(GalleryModalCtrl.startIdx).toBe(0);
    });


});