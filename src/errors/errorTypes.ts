import { ErrorCode } from './errorCodes'

export class ValidationError extends Error {
    public field?: string;
    public code: ErrorCode;

    constructor(message: string, code: ErrorCode, field?: string) {
        super(message);
        this.code = code;
        this.field = field;
        this.name = "ValidationError";
    }
}
