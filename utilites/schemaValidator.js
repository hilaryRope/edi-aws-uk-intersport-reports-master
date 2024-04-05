const Ajv = require('ajv');

const ajv = new Ajv({
    schemaId: "$id",
    meta: false,
    allErrors: true
});

const metaSchema = require('ajv/lib/refs/json-schema-draft-06.json');
ajv.addMetaSchema(metaSchema);
ajv._opts.defaultMeta = metaSchema.id;

//Expected schemas
//TODO
//Read the schemas from a file and zip them up with together with the function

function extracted() {
    const salesReportSchema = {
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
    return salesReportSchema;
}

const salesReportSchema = extracted();


const messageBody = {
    "b24Message": [{
        "slsrpt": {
            "environment": "Production",
            "documentDate": "2015-11-09",
            "periodStartDate": "2015-11-01",
            "periodEndDate": "2015-11-08",
            "buyer": "4038925000016",
            "supplier": "7640146810007",
            "msgRefNo": "I02065870016645",
            "lines": [{
                "ean": "7640165317761",
                "itemID": "102191005",
                "netPrice": 67.06,
                "salesPrice": 159.95,
                "salesQuantity": 1,
                "returnedQuantity": 1,
                "location": "4260373430019"

            },
                {
                    "ean": "7630040505581",
                    "itemID": "279279003",
                    "netPrice": 56.57,
                    "salesPrice": 134.95,
                    "salesQuantity": 10,
                    "returnedQuantity": 0,
                    "location": "4038925000191"
                }
            ]
        }
    }]
}


const compileSalesSchema = ajv.compile(salesReportSchema);

const escaped = "{\r\n\t\"b24Message\": [{\r\n\t\t\"slsrpt\": {\r\n\t\t\t\"environment\": \"Production\",\r\n\t\t\t\"documentDate\": \"2015-11-09\",\r\n\t\t\t\"periodStartDate\": \"2015-11-01\",\r\n\t\t\t\"periodEndDate\": \"2015-11-08\",\r\n\t\t\t\"buyer\": \"4038925000016\",\r\n\t\t\t\"supplier\": \"7640146810007\",\r\n\t\t\t\"msgRefNo\": \"I02065870016645\",\r\n\t\t\t\"lines\": [{\r\n\t\t\t\t\t\"ean\": \"7640165317761\",\r\n\t\t\t\t\t\"itemID\": \"102191005\",\r\n\t\t\t\t\t\"netPrice\": 67.06,\r\n\t\t\t\t\t\"salesPrice\": 159.95,\r\n\t\t\t\t\t\"salesQuantity\": 1,\r\n\t\t\t\t\t\"returnedQuantity\": 1,\r\n\t\t\t\t\t\"location\": \"4260373430019\"\r\n\r\n\t\t\t\t},\r\n\t\t\t\t{\r\n\t\t\t\t\t\"ean\": \"7630040505581\",\r\n\t\t\t\t\t\"itemID\": \"279279003\",\r\n\t\t\t\t\t\"netPrice\": 56.57,\r\n\t\t\t\t\t\"salesPrice\": 134.95,\r\n\t\t\t\t\t\"salesQuantity\": 10,\r\n\t\t\t\t\t\"returnedQuantity\": 0,\r\n\t\t\t\t\t\"location\": \"4038925000191\"\r\n\t\t\t\t}\r\n\t\t\t]\r\n\t\t}\r\n\t}]\r\n}";


const parsed = JSON.parse(escaped);

const validSales = compileSalesSchema(parsed);

console.log(ajv.errorsText(validSales.errors));

try {
    validSales;
    console.log('Validated JSON ' + validSales);
} catch (e) {
    ajv.errorsText(validSales.errors);
}



