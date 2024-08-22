import { ApiProperty } from '@nestjs/swagger';
import { ErrorCode, ResponseStatus } from '../enums';

export type ResponseDto<T> = {
  status: ResponseStatus;
  errorCode?: ErrorCode;
  message?: string;
  data: T;
};

export class OkResponseDto<T> {
  @ApiProperty({
    example: 'SUCCESS',
    description: 'Response status indicating success',
  })
  status = ResponseStatus.SUCCESS;

  @ApiProperty({
    example: 'Success',
    description: 'Message describing the result',
  })
  message = 'Success';

  @ApiProperty({
    type: 'object',
    description: 'The data returned by the response',
  })
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}
