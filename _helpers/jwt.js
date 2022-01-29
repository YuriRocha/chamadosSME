const expressJwt = require('express-jwt');
const config = require('../config.json');
const userService = require('../users/user.service');
//const callService = require('../calls/call.service');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/app/register',
            '/app/login',
            '/app/teste'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
