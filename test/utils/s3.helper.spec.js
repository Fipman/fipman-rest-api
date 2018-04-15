import S3 from '../../src/utils/s3.helper';
var chai = require('chai');
chai.should();

describe('S3 Helper', () => {
    it('should create S3 policy', () => {
        const drive = {
            "type": "s3",
            "bucket": "fake-bucket",
            "access_key": "fake-key",
            "secret_key": "fake-secret",
            "region": "us-east-1",
            "acl": "public-read",
            "x-amz-algorithm": "AWS4-HMAC-SHA256",
            "success_action_status": "201"
        }

        const result = S3.createCridentials('fake-file-name.png', drive);
        result.uploadUrl.should.equal('https://fake-bucket.s3.amazonaws.com');

        result.params.should.have.property('key', 'fake-file-name.png');
        result.params.should.have.property('acl', 'public-read');
        result.params.should.have.property('success_action_status', '201');
        result.params.should.have.property('x-amz-algorithm', 'AWS4-HMAC-SHA256');
        result.params.should.have.property('x-amz-credential');
        result.params.should.have.property('x-amz-date');
        result.params.should.have.property('x-amz-signature');
        result.params.should.have.property('policy');
    })
})
