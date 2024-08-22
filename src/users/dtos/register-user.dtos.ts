import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { toLowercase } from '@app/libs';

export class RegisterUserRequest {
  @ApiProperty({
    description: 'User email',
    example: 'example@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(toLowercase)
  email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'User confirm password',
    example: 'StrongPassword123!',
  })
  @IsString()
  @IsNotEmpty()
  confirmPassword: string;
}
