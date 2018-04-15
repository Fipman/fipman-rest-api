'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _clients = require('./clients.route');

var _clients2 = _interopRequireDefault(_clients);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (app) {
  app.use('/clients', _clients2.default);
};