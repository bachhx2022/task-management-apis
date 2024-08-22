import { ConflictException } from '@nestjs/common';
import { ErrorCode, ResponseStatus } from '../enums';
import { ResponseDto } from '../dtos';

export class NotFoundResourceException extends ConflictException {
  constructor(message?: string) {
    const response: ResponseDto<unknown> = {
      status: ResponseStatus.ERROR,
      errorCode: ErrorCode.RESOURCE_NOT_FOUND,
      message: message || 'Resource not found',
      data: null,
    };
    super(response);
  }
}
