const config = require("../config.json");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI ||config.connectionString, {family: 4});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Call: require('../calls/call.model')
};
