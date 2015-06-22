var CheckEvent = require('../../models/checkEvent');
var HipchatRoom = require('./component/hipchat/room');

exports.initWebApp = function() {
    CheckEvent.on('afterInsert', function(checkEvent) {
        if (!config.event[checkEvent.message]) {
            return;
        }
        checkEvent.findCheck(function(err, check) {
            if (err) {
                return console.error(err);
            }

            console.log("[Uptime] The application " + check.name  + " just went to status " + checkEvent.message);
        });
    });

    console.log('Enabled Hipchat Notification');
};