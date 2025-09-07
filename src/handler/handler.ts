import { APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { AvailableTrainUseCase } from '../application/availableTrainUseCase';
import { handleError } from '../errors/errorHandler';
import { Logger } from "@aws-lambda-powertools/logger";
import { ValidationError } from '../errors/errorTypes'
import { AvailableTrainRequestSchema } from '../validations/requestValidation';
import { ErrorCode } from '../errors/errorCodes'
import { Tracer } from '@aws-lambda-powertools/tracer';

export class AvailableTrainHandler {
    private readonly _useCase: AvailableTrainUseCase;
    private readonly _tracer: Tracer;
    private readonly _logger: Logger;

    constructor(useCase: AvailableTrainUseCase, tracer: Tracer, logger: Logger){
        this._useCase = useCase;
        this._tracer = tracer;
        this._logger = logger;
    }

    handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyStructuredResultV2> => {
        this._tracer.getSegment();
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
