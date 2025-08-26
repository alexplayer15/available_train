import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { CustomErrorFactory } from '../../entities/customError';
import { ValidationError } from '../errorTypes';

export class ValidationErrorFactory implements CustomErrorFactory {

    canHandle(err: unknown): boolean {
        return err instanceof ValidationError;
    }

    getResponse(err: ValidationError, event: any): APIGatewayProxyStructuredResultV2 {
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Validation failed",
                codes: [err.code],
                field: err.field,
                message: err.message,
                event
            }),
        }
    }
}