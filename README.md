## Introduction 

This is the repository for the Available Train Lambda. This Lambda allows you to make an API request through API Gateway for an available train. 
If an available train exists for your search criteria, you will be returned the details of that train.

## Example usage
Say that you wanted to make a guaranteed happy path request to your service. How can you guarantee that the train you make a request for is valid and available? That is where the Available Train Lambda can help. It is fronted by an API Gateway so you will need to send a request like the following:
``` json
{
  "version": "2.0",
  "routeKey": "POST /available-train",
  "rawPath": "/available-train",
  "rawQueryString": "",
  "headers": {
    "content-type": "application/json"
  },
  "requestContext": {
    "accountId": "123456789012",
    "apiId": "api-id-example",
    "domainName": "example.com",
    "domainPrefix": "example",
    "http": {
      "method": "POST",
      "path": "/available-train",
      "protocol": "HTTP/1.1",
      "sourceIp": "127.0.0.1",
      "userAgent": "local-test"
    },
    "requestId": "req-12345",
    "routeKey": "POST /available-train",
    "stage": "dev",
    "time": "07/Sep/2025:21:00:00 +0000",
    "timeEpoch": 1757288400000
  },
  "body": "{\"departureCode\":\"SHF\",\"arrivalCode\":\"LDN\"}",
  "isBase64Encoded": false
}
```
The API Gateway only accepts POST requests and notice you will need to provide an event body like:
``` json
"{\"departureCode\":\"SHF\",
  \"arrivalCode\":\"LDN\"}"
```

At minimum, you will need to provide a departureCode and an arrivalCode for your train. They must be valid stations, if the Lambda cannot find an available train for your stations, it will return an empty list.

If there is an available train, you should see a response like this:

``` json
{
  "routeId": "SHF#LDN",
  "trainId": "CHILTERN-001",
  "departureTime": "08:15",
  "arrivalTime": "10:05",
  "durationMinutes": 110,
  "departureDate": "2025-12-30",
  "operator": "Chiltern Railways",
}
```
As you can see, now you have a valid and available train which you can use!

## Local setup

In order to run and test the available flight lambda locally. Follow these steps:

## Pre-requisites 
- AWS SAM CLI
- AWS CLI
- Node v20
- Docker
- tflocal

## Steps to follow:
1. Run `npm install`
2. Run `npm run sam:build`
3. Run `docker compose up -d --build` - this will spin up LocalStack
and create the S3 bucket to store the Lambda artifacts in.
4. Create a `terraform/backend_override.tf` file with the following content (only needs to be done once):

```hcl
terraform {
  backend "local" {
    path = "./.local-state"
  }
}
```
5. Run `terraform init`

6. (Optional) Run `terraform validate` to ensure configuration is valid.

### NOTE: If running from Windows you may need to install dos2unix and run it against the .sh scripts

7. Upload the lambda artifact to the s3 bucket
``` bash
../awslocal-scripts/1-upload-lambda-artifact-to-s3.sh
```
8. To create all infrastructure locally, run following inside the `terraform` dir:

``` bash 
tflocal apply -var-file="input-vars/localstack.tfvars" --auto-approve
```

9. Populate AvailableTrain table with test data
``` bash
../awslocal-scripts/2-populate-table.sh
```

10. Invoke the available train Lambda
``` bash
../awslocal-scripts/3-invoke-available-train-lambda.sh
```
