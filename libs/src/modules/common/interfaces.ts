import { ModuleMetadata, Type } from '@nestjs/common';

export interface MiscModuleOptions {
  secretKey: string;
  salt: string;
}

export interface MiscModuleFactory {
  createHttpModuleOptions: () =>
    | Promise<MiscModuleOptions>
    | MiscModuleOptions;
}

export interface MiscModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<MiscModuleFactory>;
  useExisting?: Type<MiscModuleFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<MiscModuleOptions> | MiscModuleOptions;
}
