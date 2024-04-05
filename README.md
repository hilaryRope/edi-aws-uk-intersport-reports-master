# edi-aws-uk-intersport-reports
## Intersport Sell-out and Inventory data on AWS S3

### Goal of the Project
The goal of the project is to receive Customer Inventory Reports and Sales Reports in JSON format, parse them and make them available to be consumed by other services.

### Requirements
We need to store JSON raw files onto RDS or another DB of choice hosted in AWS in order to enable re-import process and troubleshooting activities by non developers. 

### Confluence Page and Documentation
Full documentation of all the required configuration files, steps and processes can be found [here](https://onrunning.atlassian.net/wiki/spaces/OT/pages/126582835/EDI+AWS+UK+SalesReport+InventoryReport+Project)

### Project structure
This project encompasses the following: 

- ```lambdas```. It includes the lambda function currently working with the 2 versions of the report files. Please note that once the new versions area confirmed, then the lambda will need re-working.
- ```events``` folder. It includes Lambda events created to test the current version of the Lambda function. For more info on how to create Test Events from within the Lambda AWS console, please see [this](https://aws.amazon.com/blogs/compute/improved-testing-on-the-aws-lambda-console/). The included events covers 2 working ones (1 each message type) and one invalid salesReport event. 
- ```policies``` folder. It includes the buckets' policies together with the lambda execution role policy. Please note that the naming conventions used for such policies are the same as the ones used in the Confluence Documentation. 
- ```sampleJson``` folder. It includes 4 JSON samples. Please note that the lambda function has been developed and tested against the files initially provided: ```inventoryReports.json``` and ```salesReports.json``` (```invalidSalesReports.json``` was used to test the exception path). However, based on recent development (please see [this](https://onrunning.atlassian.net/browse/EDI-38)), there is a new version, still under development, of the salesReport format. For convenience, I have included such file and named it as ```NEW_salesReport.json```
- ```schemas``` folder. All schemas in V4 and V6. It also includes the generated V6 schema for the newly amended salesReport
- ```utilities``` folder. It includes a few utilities classes to perform the following: 1) get objects from a specific bucket 2) put objects into a specific buckets and 3) validates the json file against its schema

