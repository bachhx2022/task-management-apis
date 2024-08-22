import { ApiProperty } from '@nestjs/swagger';

export class SetCompleteTaskRequest {
  @ApiProperty({
    description: 'Task status',
    example: true,
  })
  isCompleted: boolean;
}
