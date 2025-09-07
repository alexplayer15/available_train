#!/bin/sh
set -e
echo "Running populate-table.sh"
sleep 2

awslocal dynamodb batch-write-item \
  --request-items "$(cat ../awslocal-scripts/AvailableTrainData.json)" \
  --region eu-west-2