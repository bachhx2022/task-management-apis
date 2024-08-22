import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDetailsResponse {
  @ApiProperty({
    description: 'Task id',
    example: '01917806-0543-75f6-ac56-229a6702de63',
  })
  id: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Task 1',
  })
  title: string;

  @ApiProperty({
    description: 'Task status',
    example: true,
  })
  isCompleted: boolean;

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
