import { AvailableTrainHandler } from "../../src/handler/handler"
import { AvailableTrainUseCase } from '../../src/application/availableTrainUseCase';
import { AvailableTrainRepository } from "../../src/repository/availableTrainRepository";
import { Logger } from "@aws-lambda-powertools/logger";
import { createAPIGatewayEvent } from "../utils/testUtils"
import { DynamoDbStore } from "../../src/store/dynamoDbStore";
import { Tracer } from '@aws-lambda-powertools/tracer';

let tracer = new Tracer();
let logger = new Logger();
let store = new DynamoDbStore(logger)
let repository = new AvailableTrainRepository(store, logger);
let useCase = new AvailableTrainUseCase(repository, logger);
let handler = new AvailableTrainHandler(useCase, tracer, logger);
  
  describe("AvailableTrainHandler is sent a valid request for an available train", () => {
    it("should return an available train to the user", async () => {
        // Arrange
        let eventBody = {
         "departureCode": "SHF",
         "arrivalCode": "LDN",
        }
        let stringifiedEventBody = JSON.stringify(eventBody);
        const apiGatewayEvent = createAPIGatewayEvent(stringifiedEventBody);

        const queryCommandOutput = {
            "$metadata": {
              "httpStatusCode": 200,
              "requestId": "ABC123XYZ",
              "attempts": 1,
              "totalRetryDelay": 0
            },
            "Count": 1,
            "ScannedCount": 1,
            "Items": [
            {
              "routeId": { "S": "SHF#LDN" },
              "trainId": { "S": "CHILTERN-001" },
              "departureTime": { "S": "08:15" },
              "arrivalTime": { "S": "10:05" },
              "durationMinutes": { "N": "110" },
              "departureDate" : { "S": "2025-12-30" },
              "operator" : { "S": "Chiltern Railways" }
            }]
          }
          
        jest.spyOn(store, "queryItem").mockResolvedValue(queryCommandOutput);

        const expectedAvailableTrainDetails = {
            "routeId": "SHF#LDN",
            "trainId": "CHILTERN-001",
            "departureTime": "08:15",
            "arrivalTime": "10:05",
            "durationMinutes": 110,
            "departureDate": "2025-12-30",
            "operator": "Chiltern Railways",
        }
  
        // Act
        const res = await handler.handler(apiGatewayEvent);
  
        // Assert
        expect(res.statusCode).toBe(200);
        const parsedBody = JSON.parse(res.body!);
        expect(parsedBody).toEqual(expectedAvailableTrainDetails);
      }
    );
  });