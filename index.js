var CheckEvent = require('../../models/checkEvent');
var HipchatRoom = require('./component/hipchat/room');
var config = require('config');

exports.initWebApp = function() {
    var room = new HipchatRoom(config.hipchat.roomId, config.hipchat.token);
    CheckEvent.on('afterInsert', function(checkEvent) {
        if (!config.event[checkEvent.message]) {
            return;
        }
        checkEvent.findCheck(function(err, check) {
            if (err) {
                return console.error(err);
            }


            room.sendNotification("[Uptime] The application " + check.name  + " just went to status " + checkEvent.message);
            console.log("[Uptime] The application " + check.name  + " just went to status " + checkEvent.message);
        });
    });

    console.log('Enabled Hipchat Notification');
};