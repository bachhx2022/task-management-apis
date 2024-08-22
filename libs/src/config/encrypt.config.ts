import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { registerAsWithValidation } from './configuration';

export class EncryptConfig {
  secretKey: string;
  salt: string;
}

class EnvConfig {
  @Expose()
  @IsNotEmpty()
  APP_SECRET_KEY: string;

  @Expose()
  @IsNotEmpty()
  APP_SALT: string;
}

export const encryptConfig = registerAsWithValidation(
  'EncryptConfig',
  EnvConfig,
  process.env,
  (config): EncryptConfig => ({
    secretKey: config.APP_SECRET_KEY,
    salt: config.APP_SALT,
  }),
);
