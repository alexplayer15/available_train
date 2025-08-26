import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { CustomErrorFactory } from '../entities/customError';
import { ValidationErrorFactory } from './errorFactories/validationErrorFactory';
import { SyntaxErrorFactory } from './errorFactories/syntaxErrorFactory';
import { ZodErrorFactory } from './errorFactories/zodErrorFactory';
import { UnknownErrorFactory } from './errorFactories/unknownErrorFactory';

export function handleError(err: unknown, event?: any): APIGatewayProxyStructuredResultV2 {

    const errorFactories: CustomErrorFactory[] = [
        new ValidationErrorFactory(),
        new SyntaxErrorFactory(),
        new ZodErrorFactory(),
        new UnknownErrorFactory(),
    ]

    for(const factory of errorFactories){
        if (factory.canHandle(err)){
            return factory.getResponse(err, event)
        }
    }
    return {
        statusCode: 500,
        body: JSON.stringify({
            error: "Non-error thrown",
            event
        }),
    };
}
  
