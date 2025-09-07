#!/bin/sh

awslocal s3api put-object \
    --bucket "available-train-lambda-artifacts" \
    --key available-train-lambda/handler.zip \
    --body ../dist/index.zip \
    --metadata "Tag=local"