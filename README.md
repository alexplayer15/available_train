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
