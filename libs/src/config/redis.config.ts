import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { registerAsWithValidation } from './configuration';

export class RedisConfig {
  host: string;
}

class EnvConfig {
  @Expose()
  @IsNotEmpty()
  APP_REDIS_HOST: string;
}

export const redisConfig = registerAsWithValidation(
  'RedisConfig',
  EnvConfig,
  process.env,
  (config): RedisConfig => ({
    host: config.APP_REDIS_HOST,
  })
);
