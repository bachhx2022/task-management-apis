import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { registerAsWithValidation } from './configuration';

export class WeatherConfig {
  weatherApiKey: string;
}

class EnvConfig {
  @Expose()
  @IsNotEmpty()
  WHEATHER_API_KEY: string;
}

export const weatherConfig = registerAsWithValidation(
  'WeatherConfig',
  EnvConfig,
  process.env,
  (config): WeatherConfig => ({
    weatherApiKey: config.WHEATHER_API_KEY,
  }),
);
