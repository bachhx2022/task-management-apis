import { ModuleMetadata, Type } from '@nestjs/common';

export interface AuthModuleOptions {
  jwtTokenSecret: string
}

export interface AuthModuleFactory {
  createHttpModuleOptions: () =>
    | Promise<AuthModuleOptions>
    | AuthModuleOptions;
}

export interface AuthModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<AuthModuleFactory>;
  useExisting?: Type<AuthModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AuthModuleOptions> | AuthModuleOptions;
}
