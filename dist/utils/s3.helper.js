'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AMZ_ALGORITHM = 'AWS4-HMAC-SHA256';
var ACL = 'public-read';
var SUCCESS_STATUS = '201';

// Private functions
function createHmacDigest(key, string) {
  var hmac = _crypto2.default.createHmac('sha256', key);
  hmac.write(string);
  hmac.end();
  return hmac.read();
}

var createCridentials = function createCridentials(filename, drive) {
  var date = new Date().toISOString();
  var dateString = date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2);
  var credential = drive.access_key + '/' + dateString + '/' + drive.region + '/s3/aws4_request';

  var policy = {
    expiration: new Date(new Date().getTime() + 1 * 60 * 1000).toISOString(),
    conditions: [{ bucket: drive.bucket }, { key: filename }, { acl: ACL }, { success_action_status: SUCCESS_STATUS }, { 'x-amz-algorithm': AMZ_ALGORITHM }, { 'x-amz-credential': credential }, { 'x-amz-date': dateString + 'T000000Z' }]
  };

  // base64 encode policy
  var policyBase64 = Buffer.from(JSON.stringify(policy)).toString('base64');

  var dateKey = createHmacDigest('AWS4' + drive.secret_key, dateString);
  var dateRegionKey = createHmacDigest(dateKey, drive.region);
  var dateRegionServiceKey = createHmacDigest(dateRegionKey, 's3');
  var signingKey = createHmacDigest(dateRegionServiceKey, 'aws4_request');
  var xAmzSignature = createHmacDigest(signingKey, policyBase64).toString('hex');

  var result = {
    uploadUrl: 'https://' + drive.bucket + '.s3.amazonaws.com',
    params: {
      key: filename,
      acl: ACL,
      success_action_status: SUCCESS_STATUS,
      policy: policyBase64,
      'x-amz-algorithm': AMZ_ALGORITHM,
      'x-amz-credential': credential,
      'x-amz-date': dateString + 'T000000Z',
      'x-amz-signature': xAmzSignature
    }
  };

  return result;
};

exports.default = { createCridentials: createCridentials };