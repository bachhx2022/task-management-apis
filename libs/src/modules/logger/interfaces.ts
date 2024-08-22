import { ModuleMetadata, Type } from '@nestjs/common';

export interface LoggerModuleOptions {}

export interface LoggerModuleFactory {
  createHttpModuleOptions: () => Promise<LoggerModuleOptions> | LoggerModuleOptions;
}

export interface LoggerModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<LoggerModuleFactory>;
  useExisting?: Type<LoggerModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<LoggerModuleOptions> | LoggerModuleOptions;
}
