import { ModuleMetadata, Type } from '@nestjs/common';

export interface MikroModuleFactory {
  createHttpModuleOptions: () => Promise<void>;
}

export interface MikroModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<MikroModuleFactory>;
  useExisting?: Type<MikroModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<void>;
}
