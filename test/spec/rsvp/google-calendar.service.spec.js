/**
 * Created by Kelvin on 8/9/2016.
 */
describe('Factory: GoogleCalendar', function() {

    // load the service's module
    beforeEach(module('tiffanyAndKelvin'));
    beforeEach(module('templates'));

    var GoogleCalendar;

    var rootScope;

    var $q;

    var mockEvents = {
        insert: function() {
            return {
                execute: function(cb) {
                    cb();
                }
            }
        }
    };

    beforeEach(inject(function (_GoogleCalendar_, _$rootScope_, _$q_, _$window_) {
        rootScope =  _$rootScope_;
        GoogleCalendar = _GoogleCalendar_;

        $q = _$q_;

        _$window_.gapi = {
            auth: {
                authorize: function() {return $q.resolve();}
            },
            client: {
                load: function() {return $q.resolve();},
                calendar: {
                    events: mockEvents
                }
            }
        };

        spyOn(mockEvents, 'insert').and.callThrough();

    }));

    it('should add a script tag for google\'s client js', function() {
        var actual = document.querySelector('script[src="https://apis.google.com/js/client.js?onload=gapiInitialized"]');
        expect(actual).not.toBe(null);
    });

    it('should set the initialized property to a promise', function() {
        var actual = GoogleCalendar.initialized;
        expect('then' in actual).toBe(true);
    });

    describe('set event method', function() {

        it('should return a promise', function() {
            var actual = GoogleCalendar.setCalendarEvent();
            expect('then' in actual).toBe(true);
        });

        it('should call gapi.client.calendar.events.insert method', function() {
            GoogleCalendar.setCalendarEvent();
            rootScope.$apply();
            expect(mockEvents.insert).toHaveBeenCalled();
        });

    });


});