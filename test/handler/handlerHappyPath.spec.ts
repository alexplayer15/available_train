import { AvailableTrainHandler } from "../../src/handler/handler"
import { AvailableTrainUseCase } from '../../src/application/availableTrainUseCase';
import { AvailableTrainRepository } from "../../src/repository/availableTrainRepository";
import { Logger } from "@aws-lambda-powertools/logger";
import { createAPIGatewayEvent } from "../utils/testUtils"
import { DynamoDbStore } from "../../src/store/dynamoDbStore";

let logger = new Logger();
let store = new DynamoDbStore(logger)
let repository = new AvailableTrainRepository(store, logger);
let useCase = new AvailableTrainUseCase(repository, logger);
let handler = new AvailableTrainHandler(useCase, logger);
  
  describe("AvailableTrainHandler is sent a valid request for an available train", () => {
    it("should return an available train to the user", async () => {
        // Arrange
        let eventBody = {
         "departureCode": "BMO",
         "arrivalCode": "MYB",
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
                "departureCode": { "S": "BMO" },
                "arrivalCode": { "S": "MYB" },
                "localDepartureDate": { "S": "2025-08-24" },
                "languageCode": { "S": "en" },
              }
            ]
          }
          
        jest.spyOn(store, "queryItem").mockResolvedValue(queryCommandOutput);

        const expectedAvailableTrainDetails = {
            "departureCode": "BMO",
            "arrivalCode": "MYB",
            "localDepartureDate": "2025-08-24",
            "languageCode": "en",
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