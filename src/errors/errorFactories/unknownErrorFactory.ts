import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import { CustomErrorFactory } from '../../entities/customError';


export class UnknownErrorFactory implements CustomErrorFactory {

    canHandle(err: unknown): boolean {
        return err instanceof Error;
    }

    getResponse(err: Error, event: any): APIGatewayProxyStructuredResultV2 {    
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Unknown error",
                message: err.message,
                event
            }),
        };
    }
}