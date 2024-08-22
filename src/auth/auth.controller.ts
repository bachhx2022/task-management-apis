import { Body, Controller, Post } from '@nestjs/common';
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from './dtos';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AllowAnonymous, Headers } from '@app/libs';
import { Authorize } from '../decorators';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOkResponse({ type: LoginResponse })
  @ApiBadRequestResponse()
  @AllowAnonymous()
  async login(
    @Headers('authorization') authorization: string,
    @Body() request: LoginRequest,
  ) {
    return this.authService.login(request, authorization);
  }

  @Post('/refresh-token')
  @ApiOkResponse({ type: RefreshTokenResponse })
  @ApiBadRequestResponse()
  @AllowAnonymous()
  async refreshToken(@Body() request: RefreshTokenRequest) {
    return this.authService.refreshToken(request);
  }

  @Post('/logout')
  @ApiOkResponse({ type: RefreshTokenResponse })
  @ApiBadRequestResponse()
  @Authorize()
  async logout() {
    return this.authService.logout();
  }
}
