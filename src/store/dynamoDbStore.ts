import { DynamoDB, DynamoDBServiceException, QueryCommand, QueryCommandOutput } from "@aws-sdk/client-dynamodb";
import { Logger } from "@aws-lambda-powertools/logger";

export class DynamoDbStore {
    private readonly _logger: Logger; 
    private readonly _dynamoDbClient = new DynamoDB({ region: 'eu-west-1' })

    constructor(_logger: Logger){
        this._logger = _logger;
    }

    async queryItem(queryCommand: QueryCommand): Promise<QueryCommandOutput>{
        try{
            return await this._dynamoDbClient.send(queryCommand)
        }  
        catch(err){
            this._logger.error('Error sending Query to DynamoDb') // find out how to put err here
            throw err as DynamoDBServiceException //add dynamoDb errors to error handler
        }
    }
}