encoded_payload=$(base64 < ../awslocal-scripts/event.json)

awslocal lambda invoke \
    --function-name AvailableTrain \
    --payload "$encoded_payload" \
    --region eu-west-2 \
    output.json