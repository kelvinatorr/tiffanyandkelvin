/**
 * Created by Kelvin on 6/28/2016.
 */
/* jshint ignore:start */
'use strict';

describe('Factory: RSVP', function () {

    // load the service's module
    beforeEach(module('tiffanyAndKelvin'));

    // instantiate service
    var RSVPFactory;

    var mockData = {
        ABC: {
            name: 'Kelvin'
        },
        DEF: {
            name: 'Tiffany'
        }
    };

    var mockKey = 'QQQQQQ';

    var mockSet = {};

    var deferred;

    var rootScope;

    beforeEach(module(function($provide) {
        //$provide.value('FirebaseFactory', {
        //    database: mockDatabase
        //});

        $provide.factory('FirebaseFactory', function($q) {
            deferred = $q.defer();
            var promise = deferred.promise;

            function on(str, cb) {
                var snapShot = {
                    val: function() {
                        return mockData;
                    },
                    key: mockKey
                };
                cb(snapShot);
            }

            mockSet.set = function() {
                return promise;
            };

            this.database = {
                ref: function() {
                    return {
                        on: on,
                        set: mockSet.set
                    }
                }
            };

            return this;
        });
    }));

    beforeEach(inject(function (_RSVPFactory_, _$rootScope_, _$q_) {
        rootScope =  _$rootScope_;
        RSVPFactory = _RSVPFactory_;
    }));

    it('should do something', function () {
        expect(!!RSVPFactory).toBe(true);
    });

    describe('getData', function() {
        it('should return a promise', function() {
            var result = RSVPFactory.getData(mockKey);
            expect('then' in result).toBe(true);
        });

        it('should set key to be snapshot.key', function() {
            RSVPFactory.getData(mockKey);
            expect(RSVPFactory.key).toBe(mockKey);
        });

        it('should set data to be mockData', function() {
            RSVPFactory.getData(mockKey);
            expect(RSVPFactory.data).toEqual(mockData);
        });
    });

    describe('save', function() {
        var newData = {
            foo: 'bar'
        };

        beforeEach(function() {
            spyOn(mockSet, 'set').and.callThrough();
        });

        it('should return a promise', function() {
            var actual = RSVPFactory.save(newData);
            expect('then' in actual).toBe(true);
        });

        it('should call set on the firebase database with newData', function() {
            RSVPFactory.save(newData);
            expect(mockSet.set).toHaveBeenCalledWith(newData);
        });
    });
});
/* jshint ignore:end */
