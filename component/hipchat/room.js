var request = require('request');
var Hipchat = require('../hipchat');

function RoomHipchat(roomId, token) {
    Hipchat.call(this, token);
    this.roomId = roomId;
}

RoomHipchat.prototype.sendNotification = function(message, color) {
    var payload = {};
    payload.color = color;
    payload.message  = message;
    payload.notify = false;
    payload.message_format = 'html';

    var url = this.apiUrl + '/room/' + this.roomId + '/notification?auth_token=' + this.token;

    request({
            method: 'POST',
            url: url,
            json: true,
            headers: {
                'content-type': 'application/json',
            },
            body: payload
        },
        function(error, response, body){
            if(error) {
                return console.error('Error notification : ', error);
            }

            console.log('Success : ', body);
        });
}

module.exports = RoomHipchat;