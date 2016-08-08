/**
 * Created by Kelvin on 8/2/2016.
 */
/* jshint ignore:start */
'use strict';

describe('Factory: GoogleMapInit', function () {

    // load the service's module
    beforeEach(module('tiffanyAndKelvin'));

    // instantiate service
    var GoogleMapInit;

    beforeEach(inject(function (_GoogleMapInit_) {
        GoogleMapInit = _GoogleMapInit_;
    }));

    it('should return a promise', function() {
        var actual = GoogleMapInit.mapsInitialized;
        expect('then' in actual).toBe(true);
    });
});
/* jshint ignore:end */
