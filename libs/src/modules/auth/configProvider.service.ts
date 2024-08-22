import { Injectable, Scope, Inject } from '@nestjs/common';
import { AUTH_MODULE_OPTIONS } from './constants';
import { AuthModuleOptions } from './interfaces';

@Injectable({ scope: Scope.REQUEST })
export class ConfigProvider {
  constructor(@Inject(AUTH_MODULE_OPTIONS) private config: AuthModuleOptions) {}

  get jwtTokenSecret() {
    return this.config.jwtTokenSecret;
  }
}
