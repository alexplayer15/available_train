import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { CustomErrorFactory } from '../../entities/customError';
import { ValidationError } from '../errorTypes';
import { mapZodErrorToValidationError } from '../mapZodErrorToValidationError';
import { ZodError } from 'zod';

export class ZodErrorFactory implements CustomErrorFactory {

    canHandle(err: unknown): boolean {
        return err instanceof ZodError;
    }

    getResponse(err: ZodError, event: any): APIGatewayProxyStructuredResultV2 {
        let zodValidationErrors: ValidationError[] = [];
            zodValidationErrors = mapZodErrorToValidationError(err);
        
        return {
            statusCode: 400,
            body: JSON.stringify({
                error: "Validation failed",
                codes: zodValidationErrors.map(err => err.code), 
                field: zodValidationErrors.map(err => err.field?.split(" ")), 
                message: zodValidationErrors.map(err => err.message.split(" ")),
                event
            }),
        };
    }
}