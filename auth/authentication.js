var settings = require('../config/config.json');
const moment = require('moment');
const jwt = require('jwt-simple');

//
// Encode (van username naar token)
//
function encodeToken(username) {
    const payload = {
        exp: moment().add(12, 'days').unix(),
        iat: moment().unix(),
        sub: username
    };
    return jwt.encode(payload, settings.secretkey);
}

//
// Decode (van token naar username)
//
function decodeToken(token, cb) {

    try {
        const payload = jwt.decode(token, settings.secretkey);

        // Check if the token has expired. To do: Trigger issue in db ..
        const now = moment().unix();

        // Check if the token has expired
        if (now > payload.exp) {
            console.log('Token has expired.');
        }

        // Return
        cb(null, payload);

    } catch (err) {
        cb(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};


