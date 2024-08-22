import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min, IsOptional, Max, IsArray } from 'class-validator';
import * as _ from 'lodash';
import { ResponseStatus } from '../enums';

export class PageableRequest {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 1000,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsOptional()
  take: number = 10;

  @IsArray()
  @IsOptional()
  sort?: string[] = [];

  skip(): number {
    return (this.page - 1) * this.take;
  }

  limit() {
    return this.take;
  }

  offset() {
    return this.skip();
  }

  sortFields() {
    const sortOrderPairs = _.map(this.sort, (field) => {
      const direction = field.startsWith('-') ? 'desc' : 'asc';
      const fieldName = field.startsWith('-') ? field.slice(1) : field;
      return [fieldName, direction] as [string, 'asc' | 'desc'];
    });

    return _.fromPairs(sortOrderPairs);
  }
}

export class PageMetaInfo {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  take: number;

  @ApiProperty({ example: 50 })
  itemCount: number;

  @ApiProperty({ example: 5 })
  pageCount: number;

  @ApiProperty({ example: false })
  hasPreviousPage: boolean;

  @ApiProperty({ example: true })
  hasNextPage: boolean;
}

export class PaginationResponseData<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty({ type: PageMetaInfo })
  meta: PageMetaInfo;
}

@ApiExtraModels(PaginationResponseData)
export class PaginationResponse<T> {
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
    type: PaginationResponseData,
    description: 'Paginated response data',
  })
  data: PaginationResponseData<T>;

  constructor(
    items: T[],
    meta: Pick<PageMetaInfo, 'page' | 'take' | 'itemCount'>,
  ) {
    this.data = {
      items,
      meta: {
        ...meta,
        pageCount: Math.ceil(meta.itemCount / meta.take),
        hasPreviousPage: meta.page > 1,
        hasNextPage: meta.page < Math.ceil(meta.itemCount / meta.take),
      },
    };
  }
}
