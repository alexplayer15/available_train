encoded_payload=$(base64 < ../awslocal-scripts/event.json)

awslocal lambda invoke \
    --function-name AvailableTrainLambda \
    --payload "$encoded_payload" \
    --region eu-west-2 \
    output.json