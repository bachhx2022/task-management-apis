import { ApiProperty } from '@nestjs/swagger';

export class IdResponse {
  @ApiProperty({ 
    description: 'Unique identifier',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' 
  })
  id: string;
}
