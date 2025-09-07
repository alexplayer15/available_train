export default {
    AWS: {
        Region: (): string => process.env.AWS_REGION ?? 'eu-west-2',
        IsLocal: (): boolean => process.env.AWS_SAM_LOCAL === 'true' || false
    },
    DynamoDB: {
        LocalEndpoint: (): string =>
            process.env.LOCAL_DYNAMODB_ENDPOINT ?? 'http://localstack:4566'
    }
}