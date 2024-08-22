import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PageMetaInfo, ListResponse } from '../../dtos';

export const ApiOkResponsePaginated = <ItemDto extends Type<unknown>>(
  itemDto: ItemDto
) =>
  applyDecorators(
    ApiExtraModels(ListResponse, itemDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ListResponse) },
          {
            properties: {
              data: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: getSchemaPath(itemDto) },
                  },
                  meta: {
                    type: 'object',
                    items: { $ref: getSchemaPath(PageMetaInfo) },
                  },
                },
              },
            },
          },
        ],
      },
    })
  );
