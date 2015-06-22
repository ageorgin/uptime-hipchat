// Constructor
function Hipchat(token) {
    this.token = token;
    this.apiUrl = 'https://api.hipchat.com/v2';
}

module.exports = Hipchat;

