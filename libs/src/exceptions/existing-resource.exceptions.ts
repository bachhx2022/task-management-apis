import { ConflictException } from '@nestjs/common';
import { ResponseDto } from '../dtos';
import { ErrorCode, ResponseStatus } from '../enums';

export class ExistingResourceException extends ConflictException {
  constructor(message?: string) {
    const response: ResponseDto<unknown> = {
      status: ResponseStatus.ERROR,
      errorCode: ErrorCode.RESOURCE_ALREADY_EXISTS,
      message: message || 'Resource already exists',
      data: null,
    };
    super(response);
  }
}
