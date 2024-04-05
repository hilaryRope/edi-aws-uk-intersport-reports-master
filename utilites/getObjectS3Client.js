'use strict';

console.log('Loading function to getObjects from a specific bucket');

const aws = require('aws-sdk');
const config = require('./config.json');

(async function () {
    try {
        aws.config.setPromisesDependency(undefined);

        aws.config.update({
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            region: "us-east-1"
        });


        const s3 = new aws.S3();
        const response = await s3.listObjectsV2({
            Bucket: 'b24.messages.landing.area'
        }).promise();

        console.log(response);


    } catch (e) {
        console.log('error', e);
    }

    debugger;

})();

