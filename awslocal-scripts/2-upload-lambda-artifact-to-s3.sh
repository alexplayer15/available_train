#!/bin/sh

awslocal s3api put-object \
    --bucket "AvailableTrainLambdaArtifacts" \
    --key available-train-lambda/available-train-handler.zip \
    --body ../dist/ \
    --metadata "Tag=local"