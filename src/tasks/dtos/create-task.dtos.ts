import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskRequest {
  @ApiProperty({ description: 'Task title', example: 'Task 1' })
  title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Task 1 description',
  })
  description: string;
}
