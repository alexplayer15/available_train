import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { AvailableTrainRequestBody } from '../entities/availableTrainRequest';
import { AvailableTrainRepository } from '../repository/availableTrainRepository';
import { Logger } from "@aws-lambda-powertools/logger";

export class AvailableTrainUseCase{
    private readonly _logger: Logger;
    private readonly _availableTrainRepository: AvailableTrainRepository;

    constructor(_availableTrainRepository: AvailableTrainRepository, _logger: Logger){
        this._availableTrainRepository = _availableTrainRepository;
        this._logger = _logger;
    }

    async execute(requestBody: AvailableTrainRequestBody): Promise<APIGatewayProxyStructuredResultV2> {

        const availableTrain = await this._availableTrainRepository.getAvailableTrain(requestBody);

        if(availableTrain === null){
            return {
                statusCode: 200,
                body: "There are no available trains with your search criteria"
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify(availableTrain),
        }
    }
}