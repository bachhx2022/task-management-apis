import { ModuleMetadata, Type } from '@nestjs/common';

export interface RedisModuleFactory {
  createHttpModuleOptions: () => Promise<void>;
}

export interface RedisModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<RedisModuleFactory>;
  useExisting?: Type<RedisModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<void>;
}
