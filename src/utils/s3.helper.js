import crypto from 'crypto';

const AMZ_ALGORITHM = 'AWS4-HMAC-SHA256';
const ACL = 'public-read';
const SUCCESS_STATUS = '201';

// Private functions
function createHmacDigest(key, string) {
  const hmac = crypto.createHmac('sha256', key);
  hmac.write(string);
  hmac.end();
  return hmac.read();
}

const createCridentials = (filename, drive) => {
  const date = new Date().toISOString();
  const dateString = date.substr(0, 4) + date.substr(5, 2) + date.substr(8, 2);
  const credential = `${drive.access_key}/${dateString}/${drive.region}/s3/aws4_request`;


  const policy = {
    expiration: new Date((new Date()).getTime() + (1 * 60 * 1000)).toISOString(),
    conditions: [
      { bucket: drive.bucket },
      { key: filename },
      { acl: ACL },
      { success_action_status: SUCCESS_STATUS },
      { 'x-amz-algorithm': AMZ_ALGORITHM },
      { 'x-amz-credential': credential },
      { 'x-amz-date': `${dateString}T000000Z` },
    ],
  };

  // base64 encode policy
  const policyBase64 = Buffer.from(JSON.stringify(policy)).toString('base64');

  const dateKey = createHmacDigest(`AWS4${drive.secret_key}`, dateString);
  const dateRegionKey = createHmacDigest(dateKey, drive.region);
  const dateRegionServiceKey = createHmacDigest(dateRegionKey, 's3');
  const signingKey = createHmacDigest(dateRegionServiceKey, 'aws4_request');
  const xAmzSignature = createHmacDigest(signingKey, policyBase64).toString('hex');

  const result = {
    uploadUrl: `https://${drive.bucket}.s3.amazonaws.com`,
    params: {
      key: filename,
      acl: ACL,
      success_action_status: SUCCESS_STATUS,
      policy: policyBase64,
      'x-amz-algorithm': AMZ_ALGORITHM,
      'x-amz-credential': credential,
      'x-amz-date': `${dateString}T000000Z`,
      'x-amz-signature': xAmzSignature,
    },
  };

  return result;
};

export default { createCridentials };
