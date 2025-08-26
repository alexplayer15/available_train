import { APIGatewayProxyEventV2, APIGatewayEventRequestContextV2 } from 'aws-lambda';

export function createAPIGatewayEvent(body: string): APIGatewayProxyEventV2 {
    return {
        version: "1.0",
        routeKey: "route-key",
        rawPath: "raw-path",
        rawQueryString: "raw-query-string",
        cookies: ["cookies"],
        headers: { test: "value" },
        queryStringParameters: { test: "value" },
        requestContext: createAPIGatewayEventRequestContext(),
        body: body,
        pathParameters: { test: "value" },
        isBase64Encoded: false,
        stageVariables: { test: "value" },
    }
}

export function createAPIGatewayEventRequestContext(): APIGatewayEventRequestContextV2 {
    return {
        accountId: "123456789012",
        apiId: "api-id-example",
        authentication: {
            clientCert: {
                clientCertPem: "-----BEGIN CERTIFICATE-----\n...\n-----END CERTIFICATE-----",
                subjectDN: "CN=example.com",
                issuerDN: "CN=Example CA",
                serialNumber: "00A1B2C3",
                validity: {
                    notBefore: "2025-01-01T00:00:00Z",
                    notAfter: "2030-01-01T00:00:00Z"
                }
            }
        },
        domainName: "example.com",
        domainPrefix: "example",
        http: {
            method: "GET",
            path: "/test",
            protocol: "HTTP/1.1",
            sourceIp: "127.0.0.1",
            userAgent: "Mozilla/5.0"
        },
        requestId: "req-12345",
        routeKey: "GET /test",
        stage: "dev",
        time: "18/Aug/2025:12:00:00 +0000",
        timeEpoch: 1755604800000
    };
}