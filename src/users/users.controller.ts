import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserRequest } from './dtos';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous, IdResponse } from '@app/libs';

@ApiTags('users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @AllowAnonymous()
  @ApiOkResponse({ type: IdResponse })
  register(@Body() request: RegisterUserRequest) {
    return this.userService.register(request);
  }
}
