import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { AvailableTrainUseCase } from '../application/availableTrainUseCase';
import { handleError } from '../errors/errorHandler';
import { Logger } from "@aws-lambda-powertools/logger";
import { ValidationError } from '../errors/errorTypes'
import { AvailableTrainRequestSchema } from '../validations/requestValidation';
import { ErrorCode } from '../errors/errorCodes'

export class AvailableTrainHandler {
    private readonly _logger: Logger;
    private readonly _useCase: AvailableTrainUseCase;

    constructor(_useCase: AvailableTrainUseCase, _logger: Logger){
        this._useCase = _useCase;
        this._logger = _logger;
    }

    handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
        this._logger.info(`Lambda invoked with event: ${JSON.stringify(event)}`)
        try {
            if (!event.body || event.body.trim() === "") {
                this._logger.error("Validation failed: Missing request body", { event }); //is this log needed?
                throw new ValidationError("Missing request body", ErrorCode.MISSING_EVENT_BODY, "body");
            }

            const requestBody = JSON.parse(event.body)
            const availableTrainRequest = AvailableTrainRequestSchema.parse(requestBody);
            let availableTrain = await this._useCase.execute(availableTrainRequest);
            return availableTrain;    
        }
        catch(err) {
            let error = handleError(err);
            //log error here?
            return error;
        }
    };
}
