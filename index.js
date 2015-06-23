var CheckEvent = require('../../models/checkEvent');
var Ping = require('../../models/ping');
var HipchatRoom = require('./component/hipchat/room');
var config = require('config');

exports.initWebApp = function() {
    var room = new HipchatRoom(config.hipchat.roomId, config.hipchat.token);
    registerNewEventsHipchat(room);
    registerNewPingsHipchat(room);
    console.log('Enabled Hipchat Notification');
};

var registerNewEventsHipchat = function(room) {
    CheckEvent.on('afterInsert', function(checkEvent) {
        checkEvent.findCheck(function(err, check) {
            var message = check.name + ' ';
            switch (checkEvent.message) {
                case 'paused':
                case 'restarted':
                    message += 'was ' + checkEvent.message;
                    break;
                case 'down':
                    message += 'went down ' + checkEvent.details;
                    break;
                case 'up':
                    if (checkEvent.downtime) {
                        message += 'went back up after ' +  Math.floor(checkEvent.downtime / 1000) + 's of downtime';
                    } else {
                        message += 'is now up';
                    }
                    break;
                default:
                    message += '(unknown event)';
            }

            room.sendNotification('[Uptime] ' + message);
        });
    });
};

var registerNewPingsHipchat = function(room) {
    Ping.on('afterInsert', function(ping) {
        ping.findCheck(function(err, check) {
            if (!ping.isUp) {
                room.sendNotification('[Uptime] The application ' + check.name  + ' responded with error "' + ping.error + '"');
            }
        });
    });
};