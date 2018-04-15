'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _s = require('../utils/s3.helper');

var _s2 = _interopRequireDefault(_s);

var _db = require('../utils/db.provider');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _express2.default.Router();

router.get('/:apiKey/s3', function (req, res) {
  var apiKey = req.params.apiKey;
  var fileNames = req.query.fileNames;


  _db.db.collection('clients').findOne({ apiKey: apiKey }, function (err, client) {
    if (err) {
      return req.status(500).send(err);
    }

    var cridentials = fileNames.split(',').map(function (fileName) {
      return _s2.default.createCridentials(fileName, client.drive);
    });
    res.send(cridentials);
  });
});

exports.default = router;