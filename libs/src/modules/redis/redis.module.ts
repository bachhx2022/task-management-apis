import { DynamicModule, Global } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { RedisModuleAsyncOptions } from './interfaces';
import { RedisConfig } from '../../config';
import { RedisService } from './redis.service';

@Global()
export class RedisModule {
  public static forRootAsync(options: RedisModuleAsyncOptions): DynamicModule {
    return {
      module: RedisModule,
      imports: [
        CacheModule.registerAsync<RedisClientOptions>({
          imports: options.imports,
          inject: options.inject,
          useFactory: (config: RedisConfig) =>
            ({
              store: redisStore.redisStore,
              url: config.host
            }) as RedisClientOptions,
        }),
      ],
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
