import { HttpException, HttpStatus } from "@nestjs/common";

enum ApiErrorCode {
    NOT_FOUND = 10001,
    INVALID_PARAM = 10002,
    ROOM_FULL = 10003,
}

class ApiException extends HttpException {

    private errorMessage: string;
    private errorCode: ApiErrorCode;
  
    constructor(errorMessage: string, errorCode: ApiErrorCode, statusCode: HttpStatus) {
  
      super(errorMessage, statusCode);
  
      this.errorMessage = errorMessage;
      this.errorCode = errorCode;
    }
  
    getErrorCode(): ApiErrorCode {
      return this.errorCode;
    }
  
    getErrorMessage(): string {
      return this.errorMessage;
    }
}

export {ApiException, ApiErrorCode}