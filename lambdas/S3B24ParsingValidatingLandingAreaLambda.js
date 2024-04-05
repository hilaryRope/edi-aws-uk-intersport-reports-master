/**
 * Lambda function validating the JSON files against the schema
 * We are using ajv to validate the incoming files against the predefined schemas
 */

const Ajv = require('ajv');
const aws = require('aws-sdk');

const SOURCE_BUCKET = 'b24.messages.landing.area';
const SOURCE_VALIDATED_EVENTS = 'validated.reports';
const SOURCE_ERROR_EVENTS = 'error.reports';
const CONSUMER_BUCKET = 'b24.consumer.data';
const SALES_REPORT_CONSUMER_FOLDER = 'sales.reports';
const INVENTORY_REPORT_CONSUMER_FOLDER = 'inventory.reports';

//Keys to be matched inside the incoming event body
const salesKey = 'slsrpt';
const inventoryKey = 'invrpt';

const s3 = new aws.S3();

const ajv = new Ajv({
    schemaId: "$id",
    meta: false,
    allErrors: true
});

//Because of backward compatibility issues with V4, we are using a newer JSON schema version
//TODO B24 needs coming back to us confirming that both schemas and version are the ones expected

const metaSchema = require('ajv/lib/refs/json-schema-draft-06.json');
ajv.addMetaSchema(metaSchema);

//TODO FIX to be included in ONDEV-1713
// Read the schemas from an additional folder called 'schemas' in the landing area bucket

const SALES_REPORT_SCHEMA = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$id": "http://example.com/root.json/",
    "type": "object",
    "title": "The Root Schema",
    "required": [
        "b24Message"
    ],
    "properties": {
        "b24Message": {
            "$id": "#/properties/b24Message",
            "type": "array",
            "title": "The B24message Schema",
            "items": {
                "$id": "#/properties/b24Message/items",
                "type": "object",
                "title": "The Items Schema",
                "required": [
                    "slsrpt"
                ],
                "properties": {
                    "slsrpt": {
                        "$id": "#/properties/b24Message/items/properties/slsrpt",
                        "type": "object",
                        "title": "The Slsrpt Schema",
                        "required": [
                            "environment",
                            "documentDate",
                            "periodStartDate",
                            "periodEndDate",
                            "buyer",
                            "supplier",
                            "msgRefNo",
                            "lines"
                        ],
                        "properties": {
                            "environment": {
                                "$id": "#/properties/b24Message/items/properties/slsrpt/properties/environment",
                                "type": "string",
                                "title": "The Environment Schema",
                                "default": "",
                                "examples": [
                                    "Production"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "documentDate": {
                                "$id": "#/properties/b24Message/items/properties/slsrpt/properties/documentDate",
                                "type": "string",
                                "title": "The Documentdate Schema",
                                "default": "",
                                "examples": [
                                    "2015-11-09"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "periodStartDate": {
                                "$id": "#/properties/b24Message/items/properties/slsrpt/properties/periodStartDate",
                                "type": "string",
                                "title": "The Periodstartdate Schema",
                                "default": "",
                                "examples": [
                                    "2015-11-01"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "periodEndDate": {
                                "$id": "#/properties/b24Message/items/properties/slsrpt/properties/periodEndDate",
                                "type": "string",
                                "title": "The Periodenddate Schema",
                                "default": "",
                                "examples": [
                                    "2015-11-08"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "buyer": {
                                "$id": "#/properties/b24Message/items/properties/slsrpt/properties/buyer",
                                "type": "string",
                                "title": "The Buyer Schema",
                                "default": "",
                                "examples": [
                                    "4038925000016"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "supplier": {
                                "$id": "#/properties/b24Message/items/properties/slsrpt/properties/supplier",
                                "type": "string",
                                "title": "The Supplier Schema",
                                "default": "",
                                "examples": [
                                    "7640146810007"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "msgRefNo": {
                                "$id": "#/properties/b24Message/items/properties/slsrpt/properties/msgRefNo",
                                "type": "string",
                                "title": "The Msgrefno Schema",
                                "default": "",
                                "examples": [
                                    "I02065870016645"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "lines": {
                                "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines",
                                "type": "array",
                                "title": "The Lines Schema",
                                "items": {
                                    "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines/items",
                                    "type": "object",
                                    "title": "The Items Schema",
                                    "required": [
                                        "ean",
                                        "itemID",
                                        "netPrice",
                                        "salesPrice",
                                        "salesQuantity",
                                        "returnedQuantity",
                                        "location"
                                    ],
                                    "properties": {
                                        "ean": {
                                            "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines/items/properties/ean",
                                            "type": "string",
                                            "title": "The Ean Schema",
                                            "default": "",
                                            "examples": [
                                                "7640165317761"
                                            ],
                                            "pattern": "^(.*)$"
                                        },
                                        "itemID": {
                                            "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines/items/properties/itemID",
                                            "type": "string",
                                            "title": "The Itemid Schema",
                                            "default": "",
                                            "examples": [
                                                "102191005"
                                            ],
                                            "pattern": "^(.*)$"
                                        },
                                        "netPrice": {
                                            "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines/items/properties/netPrice",
                                            "type": "number",
                                            "title": "The Netprice Schema",
                                            "default": 0.0,
                                            "examples": [
                                                67.06
                                            ]
                                        },
                                        "salesPrice": {
                                            "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines/items/properties/salesPrice",
                                            "type": "number",
                                            "title": "The Salesprice Schema",
                                            "default": 0.0,
                                            "examples": [
                                                159.95
                                            ]
                                        },
                                        "salesQuantity": {
                                            "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines/items/properties/salesQuantity",
                                            "type": "integer",
                                            "title": "The Salesquantity Schema",
                                            "default": 0,
                                            "examples": [
                                                1
                                            ]
                                        },
                                        "returnedQuantity": {
                                            "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines/items/properties/returnedQuantity",
                                            "type": "integer",
                                            "title": "The Returnedquantity Schema",
                                            "default": 0,
                                            "examples": [
                                                1
                                            ]
                                        },
                                        "location": {
                                            "$id": "#/properties/b24Message/items/properties/slsrpt/properties/lines/items/properties/location",
                                            "type": "string",
                                            "title": "The Location Schema",
                                            "default": "",
                                            "examples": [
                                                "4260373430019"
                                            ],
                                            "pattern": "^(.*)$"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

const INVENTORY_REPORT_SCHEMA = {
    "definitions": {},
    "$schema": "http://json-schema.org/draft-06/schema#",
    "$id": "http://example.com/root.json",
    "type": "object",
    "title": "The Root Schema",
    "required": [
        "b24Message"
    ],
    "properties": {
        "b24Message": {
            "$id": "#/properties/b24Message",
            "type": "array",
            "title": "The B24message Schema",
            "items": {
                "$id": "#/properties/b24Message/items",
                "type": "object",
                "title": "The Items Schema",
                "required": [
                    "invrpt"
                ],
                "properties": {
                    "invrpt": {
                        "$id": "#/properties/b24Message/items/properties/invrpt",
                        "type": "object",
                        "title": "The Invrpt Schema",
                        "required": [
                            "environment",
                            "documentDate",
                            "buyer",
                            "supplier",
                            "msgRefNo",
                            "lines"
                        ],
                        "properties": {
                            "environment": {
                                "$id": "#/properties/b24Message/items/properties/invrpt/properties/environment",
                                "type": "string",
                                "title": "The Environment Schema",
                                "default": "",
                                "examples": [
                                    "Production"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "documentDate": {
                                "$id": "#/properties/b24Message/items/properties/invrpt/properties/documentDate",
                                "type": "string",
                                "title": "The Documentdate Schema",
                                "default": "",
                                "examples": [
                                    "2015-11-09"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "buyer": {
                                "$id": "#/properties/b24Message/items/properties/invrpt/properties/buyer",
                                "type": "string",
                                "title": "The Buyer Schema",
                                "default": "",
                                "examples": [
                                    "4038925000016"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "supplier": {
                                "$id": "#/properties/b24Message/items/properties/invrpt/properties/supplier",
                                "type": "string",
                                "title": "The Supplier Schema",
                                "default": "",
                                "examples": [
                                    "7640146810007"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "msgRefNo": {
                                "$id": "#/properties/b24Message/items/properties/invrpt/properties/msgRefNo",
                                "type": "string",
                                "title": "The Msgrefno Schema",
                                "default": "",
                                "examples": [
                                    "I02065870016644"
                                ],
                                "pattern": "^(.*)$"
                            },
                            "lines": {
                                "$id": "#/properties/b24Message/items/properties/invrpt/properties/lines",
                                "type": "array",
                                "title": "The Lines Schema",
                                "items": {
                                    "$id": "#/properties/b24Message/items/properties/invrpt/properties/lines/items",
                                    "type": "object",
                                    "title": "The Items Schema",
                                    "required": [
                                        "ean",
                                        "quantity",
                                        "location"
                                    ],
                                    "properties": {
                                        "ean": {
                                            "$id": "#/properties/b24Message/items/properties/invrpt/properties/lines/items/properties/ean",
                                            "type": "string",
                                            "title": "The Ean Schema",
                                            "default": "",
                                            "examples": [
                                                "7640165317761"
                                            ],
                                            "pattern": "^(.*)$"
                                        },
                                        "quantity": {
                                            "$id": "#/properties/b24Message/items/properties/invrpt/properties/lines/items/properties/quantity",
                                            "type": "integer",
                                            "title": "The Quantity Schema",
                                            "default": 0,
                                            "examples": [
                                                1
                                            ]
                                        },
                                        "location": {
                                            "$id": "#/properties/b24Message/items/properties/invrpt/properties/lines/items/properties/location",
                                            "type": "string",
                                            "title": "The Location Schema",
                                            "default": "",
                                            "examples": [
                                                "4260373430019"
                                            ],
                                            "pattern": "^(.*)$"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.handler = async (event, context, callback) => {

    let messageBody = JSON.stringify(JSON.parse(event.Records[0].s3.object.body)); //prepare JSON to be compliant with BigQuery

    console.log('Logging the received event body from the report:', event.Records[0].s3.object.body);

    let objectKey = event.Records[0].s3.object.key; //Getting the object key meaning the file name in the bucket

    //Match the keys from the message body
    const isSalesReport = messageBody.indexOf(salesKey) !== -1;
    const isInventoryReport = messageBody.indexOf(inventoryKey) !== -1;

    //Compile Schemas
    const compileSalesSchema = ajv.compile(SALES_REPORT_SCHEMA);
    const compileInventorySchema = ajv.compile(INVENTORY_REPORT_SCHEMA);

    //We need to parse the escaped JSON body otherwise the validation will always return false
    const jsonObject = JSON.parse(messageBody);

    //Schema validation
    const validSalesReport = compileSalesSchema(jsonObject);
    if (validSalesReport) console.log('Logging the validated sales parsed json returns ' + validSalesReport);
    const validInventoryReport = compileInventorySchema(jsonObject);
    if (validInventoryReport) console.log('Logging the validated inventory parsed json returns ' + validInventoryReport);

    let objectTobeCopied;

    if (isSalesReport && validSalesReport) {
        console.info(ajv.errorsText('Errors for sales report are ' + validSalesReport.errors));
        objectTobeCopied = {
            CopySource: SOURCE_BUCKET + '/' + objectKey,
            Bucket: SOURCE_BUCKET + '/' + SOURCE_VALIDATED_EVENTS,
            Key: objectKey
        };
    } else if (isInventoryReport && validInventoryReport) {
        console.info(ajv.errorsText('Errors for inventory report are ' + validSalesReport.errors));
        objectTobeCopied = {
            CopySource: SOURCE_BUCKET + '/' + objectKey,
            Bucket: SOURCE_BUCKET + '/' + SOURCE_VALIDATED_EVENTS,
            Key: objectKey
        };
    } else {
        objectTobeCopied = {
            CopySource: SOURCE_BUCKET + '/' + objectKey,
            Bucket: SOURCE_BUCKET + '/' + SOURCE_ERROR_EVENTS,
            Key: objectKey
        };
    }

    await s3.copyObject(objectTobeCopied, function (copyErr, copyData) {
        if (copyErr) {
            console.info("Error message for report files while copying them onto the landing area sub-folders: " + copyErr.stack);
        } else {
            console.log('All files have been successfully copied onto the corresponding folder in the landing area ', copyData);
        }
    }).promise();

    let objectConsumerBucket;
    if (isSalesReport && validSalesReport) {
        console.log('Copying files onto the corresponding folder in the data consumer bucket');
        objectConsumerBucket = {
            CopySource: SOURCE_BUCKET + '/' + SOURCE_VALIDATED_EVENTS + '/' + objectKey,
            Bucket: CONSUMER_BUCKET,
            Key: SALES_REPORT_CONSUMER_FOLDER + '/' + objectKey
        };
    } else if (isInventoryReport && validInventoryReport) {
        console.log('Copying files onto the corresponding folder in the data consumer bucket');
        objectConsumerBucket = {
            CopySource: SOURCE_BUCKET + '/' + SOURCE_VALIDATED_EVENTS + '/' + objectKey,
            Bucket: CONSUMER_BUCKET,
            Key: INVENTORY_REPORT_CONSUMER_FOLDER + '/' + objectKey
        };
    } else if (!validSalesReport || !validInventoryReport) {
        console.log('Files that are not validated will not be forwarded to the data consumer folder');
    }

    await s3.copyObject(objectConsumerBucket, function (copyErr, copyData) {
        if (copyErr) {
            console.log("Error message for report files while copying them onto the consumer folder: " + copyErr.stack);
        } else {
            console.log('All files have been successfully copied onto the consumer folder ', copyData);
        }
    }).promise();

    callback(null, 'Closing down the process after validating and forwarding the files to correct location in the consumer bucket');

}




