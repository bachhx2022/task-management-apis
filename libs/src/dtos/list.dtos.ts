import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { IsOptional, IsArray } from 'class-validator';
import * as _ from 'lodash';
import { ResponseStatus } from '../enums';

export class ListRequest {
  @IsArray()
  @IsOptional()
  sort?: string[] = [];

  sortFields() {
    const sortOrderPairs = _.map(this.sort, (field) => {
      const direction = field.startsWith('-') ? 'desc' : 'asc';
      const fieldName = field.startsWith('-') ? field.slice(1) : field;
      return [fieldName, direction] as [string, 'asc' | 'desc'];
    });

    return _.fromPairs(sortOrderPairs);
  }
}

export class ListMetaInfo {
  @ApiProperty({ example: 50 })
  itemCount: number;
}

export class ListResponseData<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty({ type: ListMetaInfo })
  meta: ListMetaInfo;
}

@ApiExtraModels(ListResponseData)
export class ListResponse<T> {
  @ApiProperty({
    description: 'The status of the response',
    enum: ResponseStatus,
    example: ResponseStatus.SUCCESS,
  })
  status = ResponseStatus.SUCCESS;

  @ApiProperty({
    description: 'The message of the response',
    example: 'Success',
  })
  message = 'Success';

  @ApiProperty({
    type: ListResponseData,
    description: 'List response data',
  })
  data: ListResponseData<T>;

  @ApiPropertyOptional({
    description: 'List of invalid ids',
    example: [
      '019102fd-4b66-7d6d-9e6c-71290dc78b17',
      '019102fd-69ce-7e66-9db7-827787153608',
    ],
  })
  invalidIds?: string[];

  constructor(items: T[]) {
    this.data = {
      items,
      meta: {
        itemCount: items.length,
      },
    };
  }
}
