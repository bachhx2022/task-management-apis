import { UnauthorizedException } from '@nestjs/common';
import { ResponseDto } from '../dtos';
import { ErrorCode, ResponseStatus } from '../enums';

export class UserUnauthorizedException extends UnauthorizedException {
  constructor(message?: string) {
    const response: ResponseDto<unknown> = {
      status: ResponseStatus.ERROR,
      errorCode: ErrorCode.UNAUTHORIZED,
      message: message || 'Unauthorized',
      data: null,
    };
    super(response);
  }
}
