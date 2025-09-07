import { Tracer } from '@aws-lambda-powertools/tracer';
import { captureLambdaHandler } from '@aws-lambda-powertools/tracer/middleware';

const tracer = new Tracer();

export {tracer, captureLambdaHandler };