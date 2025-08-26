import { ValidationError } from './errorTypes';
import { ErrorCode } from './errorCodes'
import { ZodError } from "zod";
import { Logger } from "@aws-lambda-powertools/logger";

export function mapZodErrorToValidationError(err: ZodError): ValidationError[] {

    let logger: Logger = new Logger();
    let validationErrorList: ValidationError[] = [];

    for(const issue of err.issues){
        switch (issue.path[0]){
            case "departureCode":  
                validationErrorList
                    .push(new ValidationError(issue.message, ErrorCode.DEPARTURE_CODE_ERROR, "departureCode"))
                break;
            case "arrivalCode":
                validationErrorList
                    .push(new ValidationError(issue.message, ErrorCode.ARRIVAL_CODE_ERROR, "arrivalCode"))    
                break;
            default:
                //to do: understand impact of instantiating new instances of Logger not in a class and in multiple different places. 
                //Also incl. issue path in logs
                logger.error("Issue path, not covered in zod validator")      
                break;      
        }
    }

    return validationErrorList;
}