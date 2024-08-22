import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { AuthModuleAsyncOptions, AuthModuleFactory } from './interfaces';
import { AUTH_MODULE_OPTIONS } from './constants';
import { JwtService } from '@nestjs/jwt';
import { ContextService } from './context.service';
import { ConfigProvider } from './configProvider.service';
import { UsersService } from './users.service';

@Global()
@Module({})
export class BaseAuthModule {
  public static forRootAsync(options: AuthModuleAsyncOptions): DynamicModule {
    return {
      module: BaseAuthModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        JwtService,
        ContextService,
        ConfigProvider,
        UsersService
      ],
      exports: [JwtService, ContextService, ConfigProvider, UsersService],
    };
  }

  private static createAsyncProviders(
    options: AuthModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const useClass = options.useClass as Type<AuthModuleFactory>;

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: AuthModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: AUTH_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<AuthModuleFactory>,
    ];

    return {
      provide: AUTH_MODULE_OPTIONS,
      useFactory: async (optionsFactory: AuthModuleFactory) =>
        await optionsFactory.createHttpModuleOptions(),
      inject,
    };
  }
}
