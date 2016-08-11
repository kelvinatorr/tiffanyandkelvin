/**
 * Created by Kelvin on 8/9/2016.
 */
(function() {
    'use strict';

    angular.module('tiffanyAndKelvin')
        .service('GoogleCalendar', GoogleCalendar);

    function GoogleCalendar($q, $window) {
        var CLIENT_ID = '194227013541-5qbqe4dgvvvfrncs40jgkvsh512hm6u1.apps.googleusercontent.com';

        var SCOPES = ['https://www.googleapis.com/auth/calendar'];

        var self = this;

        var calendarDefer = $q.defer();

        var script = document.createElement('script');

        var authorized = false;

        self.initialized = calendarDefer.promise;

        self.setCalendarEvent = function() {
            var defer = $q.defer();

            var setEvent = function() {
                var summary = 'Tiffany and Kelvin Wedding';
                // TODO: check if event is already there
                var request = gapi.client.calendar.events.list({
                    'calendarId': 'primary',
                    'timeMin': '2016-12-18T00:00:00Z',
                    'timeMax': '2016-12-19T00:00:00Z',
                    'showDeleted': false,
                    'singleEvents': true,
                    'q': summary
                });
                request.then(function(resp) {
                    var events = resp.result.items;
                    var exists = false;
                    for(var i = 0; i < events.length; i++) {
                        if(events[i].summary === summary) {
                            exists = true;
                            break;
                        }
                    }
                    if(exists) {
                        defer.resolve();
                    } else {
                        var event = {
                            'summary': summary,
                            'location': '3555 S Las Vegas Blvd, Las Vegas, NV 89109',
                            'description': 'Tiffany and Kelvin are getting married.',
                            'guestsCanInviteOthers': false,
                            'start': {
                                'dateTime': '2016-12-18T15:00:00',
                                'timeZone': 'America/Los_Angeles'
                            },
                            'end': {
                                'dateTime': '2016-12-19T00:00:00',
                                'timeZone': 'America/Los_Angeles'
                            },
                            'reminders': {
                                'useDefault': false,
                                'overrides': [
                                    {'method': 'email', 'minutes': 24 * 60 * 7},
                                    {'method': 'popup', 'minutes': 24 * 60}
                                ]
                            }
                        };
                        return gapi.client.calendar.events.insert({
                            'calendarId': 'primary',
                            'resource': event
                        });
                    }
                }).then(function() {
                    // success
                    defer.resolve();
                });

            };
            if(!authorized) {
                gapi.auth.authorize({client_id: CLIENT_ID, scope: SCOPES, immediate: false}).then(function() {
                    return gapi.client.load('calendar', 'v3');
                }, function() {
                    // user clicks deny
                    defer.reject('denied');
                }).then(setEvent);
            } else {
                gapi.client.load('calendar', 'v3').then(setEvent);
            }

            return defer.promise;
        };

        // callback function - resolving promise after maps successfully loaded
        $window.gapiInitialized = function () {
            gapi.auth.authorize({'client_id': CLIENT_ID, 'scope': SCOPES.join(' '), 'immediate': true}, function (authResult) {
                authorized = (authResult && !authResult.error);
                calendarDefer.resolve();
            });
        };

        script.src = 'https://apis.google.com/js/client.js?onload=gapiInitialized';
        document.body.appendChild(script);
    }
})();