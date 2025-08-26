import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { CustomErrorFactory } from '../../entities/customError';
import { ErrorCode } from '../errorCodes';

export class SyntaxErrorFactory implements CustomErrorFactory {

    canHandle(err: unknown): boolean {
        return err instanceof SyntaxError;
    }

    getResponse(err: SyntaxError, event: any): APIGatewayProxyStructuredResultV2 {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Malformed JSON",
                codes: [ErrorCode.MALFORMED_EVENT_BODY], 
                field: "body",
                message: err.message,
                event
            }),
        };
    }
}