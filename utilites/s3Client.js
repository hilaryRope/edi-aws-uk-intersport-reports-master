const path = require('path');
const aws = require('aws-sdk');
const config = path.join(__dirname, '../', 'resources/config.json');

var s3 = new aws.S3();
var myBucket = 'b24.messages.landing.area';
var myKey = 'inventoryReportViaSDK.json';


aws.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: "us-east-1"
});

function extracted() {
    return {
        Bucket: myBucket, Key: myKey, Body: '{\n' +
            '  "b24Message": \n' +
            '  [{\n' +
            '      "invrpt": \n' +
            '      {\n' +
            '          "environment": "Production",\n' +
            '          "documentDate": "2015-11-09",\n' +
            '          "buyer":"4038925000016",\n' +
            '          "supplier":"7640146810007",\n' +
            '          "msgRefNo":"I02065870016644",\n' +
            '          "lines": \n' +
            '          [{\n' +
            '              "ean":"7640165317761",\n' +
            '              "quantity":1,\n' +
            '              "location":"4260373430019"\n' +
            '          },\n' +
            '          {\n' +
            '                "ean":"7630040505581",\n' +
            '                "quantity":1,\n' +
            '                "location":"4038925000191"\n' +
            '          }]\n' +
            '      }\n' +
            '  }]\n' +
            '}'
    };
}

const params = extracted();

s3.putObject(params, function (err, data) {

    if (err) {

        console.log(err)

    } else {

        console.log("Successfully uploaded data to myBucket/myKey");

    }

});