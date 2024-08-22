import { PageableRequest } from '@app/libs';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class SearchTasksRequest extends PageableRequest {
  @ApiProperty({
    description: 'Task title',
    required: false,
    example: 'demo',
  })
  @IsString()
  @IsOptional()
  @Type(() => String)
  query?: string;

  @ApiProperty({
    description: 'Task status',
    required: false,
  })
  @IsOptional()
  isCompleted?: boolean;

  sort: string[] = ['id'];
}

export class SearchTaskItem {
  @ApiProperty({
    description: 'Task id',
    example: '1',
  })
  id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Task 1',
  })
  title: string;

  @ApiProperty({
    description: 'Task status',
    example: 'PENDING',
  })
  status: string;

  @ApiProperty({
    description: 'Task created at',
    format: 'date-time',
    example: '2021-08-20T07:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Task updated at',
    format: 'date-time',
    example: '2021-08-20T07:00:00.000Z',
  })
  updatedAt: Date;
}
