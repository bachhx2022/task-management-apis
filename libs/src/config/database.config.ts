import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { registerAsWithValidation } from './configuration';

export class DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  dbName: string;
  poolSize: number;
  supportSsl: boolean;
}

class EnvConfig {
  @Expose()
  @IsNotEmpty()
  APP_DATABASE_HOST: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  APP_DATABASE_PORT: number;

  @Expose()
  @IsNotEmpty()
  APP_DATABASE_USERNAME: string;

  @Expose()
  @IsNotEmpty()
  APP_DATABASE_PASSWORD: string;

  @Expose()
  @IsNotEmpty()
  APP_DATABASE_NAME: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  APP_DATABASE_POOL_SIZE: number = 20;

  @Expose()
  @IsBoolean()
  @Type(() => String)
  @Transform(({ value }) => value === true || value === 'true')
  APP_DATABASE_SUPPORT_SSL: boolean;
}

export const databaseConfig = registerAsWithValidation(
  'DatabaseConfig',
  EnvConfig,
  process.env,
  (config): DatabaseConfig => ({
    host: config.APP_DATABASE_HOST,
    port: config.APP_DATABASE_PORT,
    username: config.APP_DATABASE_USERNAME,
    password: config.APP_DATABASE_PASSWORD,
    dbName: config.APP_DATABASE_NAME,
    poolSize: config.APP_DATABASE_POOL_SIZE,
    supportSsl: config.APP_DATABASE_SUPPORT_SSL,
  })
);
