import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { MiscModuleAsyncOptions, MiscModuleFactory } from './interfaces';
import { MISC_MODULE_OPTIONS } from './constants';
import { EncryptService } from './encrypt.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthService } from './jwt-auth.service';

@Global()
@Module({})
export class MiscModule {
  public static forRootAsync(options: MiscModuleAsyncOptions): DynamicModule {
    return {
      module: MiscModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        JwtService,
        JwtAuthService,
        EncryptService,
      ],
      exports: [JwtService, JwtAuthService, EncryptService],
    };
  }

  private static createAsyncProviders(
    options: MiscModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<MiscModuleFactory>;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: MiscModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MISC_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<MiscModuleFactory>,
    ];

    return {
      provide: MISC_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MiscModuleFactory) =>
        await optionsFactory.createHttpModuleOptions(),
      inject,
    };
  }
}
