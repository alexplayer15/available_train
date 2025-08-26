import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';

export interface CustomErrorFactory {
    canHandle(err: unknown): boolean
    getResponse(err: unknown, event: any): APIGatewayProxyStructuredResultV2
}