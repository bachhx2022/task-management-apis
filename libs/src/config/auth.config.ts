import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { registerAsWithValidation } from './configuration';

export class AuthConfig {
  jwtTokenSecret: string;
  jwtRefreshTokenSecret: string;
}

class EnvConfig {
  @Expose()
  @IsNotEmpty()
  APP_JWT_TOKEN_SECRET: string;

  @Expose()
  @IsNotEmpty()
  APP_JWT_REFRESH_TOKEN_SECRET: string;
}

export const authConfig = registerAsWithValidation(
  'AuthConfig',
  EnvConfig,
  process.env,
  (config): AuthConfig => ({
    jwtTokenSecret: config.APP_JWT_TOKEN_SECRET,
    jwtRefreshTokenSecret: config.APP_JWT_REFRESH_TOKEN_SECRET,
  }),
);
