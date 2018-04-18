'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.db = exports.init = undefined;

var _mongodb = require('mongodb');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connectionString = process.env.MONGO_CONNECTION || _config2.default.mongodb_connection;
var dbName = process.env.MONGO_DATABASE || _config2.default.mongodb_db;
var db = null;

var init = function init() {
  _mongodb.MongoClient.connect(connectionString, function (err, client) {
    if (err) {
      throw Error(err);
    }
    exports.db = db = client.db(dbName);
  });
};

exports.init = init;
exports.db = db;