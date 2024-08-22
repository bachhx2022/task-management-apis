import { Expose, Transform, Type } from 'class-transformer';
import { IsIn, IsNotEmpty } from 'class-validator';
import { registerAsWithValidation } from './configuration';

const LogLevel = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'] as const;
type LogLevelType = (typeof LogLevel)[number];

export class LoggerConfig {
  level: LogLevelType;
  pretty: boolean;
}

class EnvConfig {
  @Expose()
  @IsNotEmpty()
  @IsIn(LogLevel)
  APP_LOG_LEVEL: LogLevelType;

  @Expose()
  @IsNotEmpty()
  @Type(() => String)
  @Transform(({ value }) => value === true || value === 'true')
  APP_LOGGER_PRETTY: boolean;
}

export const loggerConfig = registerAsWithValidation(
  'LoggerConfig',
  EnvConfig,
  process.env,
  (config): LoggerConfig => ({
    level: config.APP_LOG_LEVEL,
    pretty: config.APP_LOGGER_PRETTY,
  })
);
