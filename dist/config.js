'use strict';

if (process.env.NODE_ENV === "development") {
    module.exports = require('../config/dev.env');
} else {
    var _process$env = process.env,
        PORT = _process$env.PORT,
        MONGODB_CONNECTION = _process$env.MONGODB_CONNECTION,
        MONGODB_DATABASE = _process$env.MONGODB_DATABASE;

    var configs = require('../config/prod.env');

    module.exports = {
        port: PORT || configs.port,
        mongodb_connection: MONGODB_CONNECTION || configs.mongodb_connection,
        mongodb_database: MONGODB_CONNECTION || configs.mongodb_database
    };
}