import { Logger } from "@aws-lambda-powertools/logger";
import { AvailableTrainRequestBody } from '../entities/availableTrainRequest';
import { AvailableTrainResponse } from "../entities/availableTrainResponse";
import { DynamoDbStore } from "../store/dynamoDbStore";
import { QueryCommand, QueryCommandOutput } from "@aws-sdk/client-dynamodb";

export class AvailableTrainRepository{
    private readonly _logger: Logger;
    private readonly _dynamoDbStore: DynamoDbStore;

    constructor(_dynamoDbStore: DynamoDbStore, _logger: Logger){
        this._dynamoDbStore = _dynamoDbStore;
        this._logger = _logger; //not using logger here yet, where would it be useful?
    }

    async getAvailableTrain(requestBody: AvailableTrainRequestBody): Promise<AvailableTrainResponse| null> {
        const queryCommand = this.getQueryCommand(requestBody);
        let queryCommandOutput = await this._dynamoDbStore.queryItem(queryCommand);

        if (!queryCommandOutput.Items || queryCommandOutput.Items.length === 0){
            return null;
        }

        const response = this.mapQueryToAvailableTrainResponse(queryCommandOutput)

        return response;
    }

    getQueryCommand(requestBody: AvailableTrainRequestBody){
        const pk = `${requestBody.departureCode}#${requestBody.arrivalCode}`;
        const command = new QueryCommand({
            TableName: "Trains",
            KeyConditionExpression: "PK = :pk",
            ExpressionAttributeValues: {
                ":pk": { S: pk }
            },
            Limit: 1,               
            ScanIndexForward: true   
        });

        return command;
    }

    mapQueryToAvailableTrainResponse(queryCommandOutput: QueryCommandOutput): AvailableTrainResponse {

        const trainDetails = queryCommandOutput.Items![0]

        return {
            departureCode: trainDetails.departureCode.S!,
            arrivalCode: trainDetails.arrivalCode.S!,
            localDepartureDate: trainDetails.localDepartureDate.S!,
            languageCode: trainDetails.languageCode.S!, //assuming complete data is guaranteed to be upserted to DynamoDb
        }
    }
}