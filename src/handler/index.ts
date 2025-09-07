import middy from '@middy/core';
import { Logger } from '@aws-lambda-powertools/logger';
import { injectLambdaContext } from '@aws-lambda-powertools/logger/middleware';
import { AvailableTrainUseCase } from '../application/availableTrainUseCase';
import { AvailableTrainHandler } from './handler';
import { tracer, captureLambdaHandler } from '../utilities';
import { AvailableTrainRepository } from '../repository/availableTrainRepository';
import { DynamoDbStore } from '../store/dynamoDbStore';

const logger = new Logger({
    persistentLogAttributes: {
      logger: {
        name: '@aws-lambda-powertools/logger'
      }
    },
    serviceName: 'availableTrain'
  });

const dynamoDbStore = new DynamoDbStore(logger);
const availableTrainRepository = new AvailableTrainRepository(dynamoDbStore, logger);
const availableTrainUseCase = new AvailableTrainUseCase(availableTrainRepository, logger);
const availableTrainHandler = new AvailableTrainHandler(availableTrainUseCase, tracer, logger)
    .handler;

const handler = middy(availableTrainHandler)
    .use(
      injectLambdaContext(logger, {
        clearState: true,
        logEvent: process.env.LOG_EVENT === 'true' || false //using this?
      })
    )
    .use(captureLambdaHandler(tracer));
  


  
