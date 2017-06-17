const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./appconfig.json');
const util = require('util');

module.exports = {
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(config.database[process.env.NODE_ENV]);
    },
    disconnect: () => {
        mongoose.disconnect();
    },
};
