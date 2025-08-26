import { AvailableTrainHandler } from "../../src/handler/handler"
import { AvailableTrainUseCase } from '../../src/application/availableTrainUseCase';
import { AvailableTrainRepository } from '../../src/repository/availableTrainRepository';
import { Logger } from "@aws-lambda-powertools/logger";
import { createAPIGatewayEvent } from "../utils/testUtils"
import { ErrorCode } from '../../src/errors/errorCodes'
import { DynamoDbStore } from "../../src/store/dynamoDbStore";

let logger = new Logger();
let store = new DynamoDbStore(logger)
let repository = new AvailableTrainRepository(store, logger);
let useCase = new AvailableTrainUseCase(repository, logger);
let handler = new AvailableTrainHandler(useCase, logger);

const validationTestCases = [
    {
      description: "event body is missing",
      eventBody: "",
      expectedCode: ErrorCode.MISSING_EVENT_BODY,
    },
    {
        description: "event body is malformed JSON",
        eventBody: "{/// test test ///}",
        expectedCode: ErrorCode.MALFORMED_EVENT_BODY,  
    },
    {
      description: "departureCode is missing",
      eventBody: JSON.stringify({ arrivalCode: "MAN" }),
      expectedCode: ErrorCode.DEPARTURE_CODE_ERROR,
    },
    {
      description: "arrivalCode is missing",
      eventBody: JSON.stringify({ departureCode: "LDN" }),
      expectedCode: ErrorCode.ARRIVAL_CODE_ERROR,
    },
  ];
  
  describe("AvailableTrainHandler validation errors", () => {
    it.each(validationTestCases)(
      "Returns 400 and correct error code when $description",
      async ({ eventBody, expectedCode }) => {
        // Arrange
        const apiGatewayEvent = createAPIGatewayEvent(eventBody);
  
        // Act
        const res = await handler.handler(apiGatewayEvent);
  
        // Assert
        expect(res.statusCode).toBe(400);
        const parsedBody = JSON.parse(res.body!);
        expect(parsedBody.codes).toContainEqual(expectedCode);
      }
    );
  });

