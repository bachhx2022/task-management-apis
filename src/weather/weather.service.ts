import { Inject, Injectable, Logger } from '@nestjs/common';
import { OkResponseDto, weatherConfig } from '@app/libs';
import { ConfigType } from '@nestjs/config';
import axios from 'axios';
import * as retry from 'async-retry';
import { RedisService } from '@app/libs/modules/redis/redis.service';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);

  constructor(
    @Inject(weatherConfig.KEY)
    private readonly weatherConf: ConfigType<typeof weatherConfig>,
    private redis: RedisService,
  ) {}

  async getDetails(city: string) {
    const cacheKey = `weather-data:${city}`;
    const cachedData = await this.redis.client.get(cacheKey);

    if (cachedData) {
      return new OkResponseDto(JSON.parse(cachedData));
    }

    const data = await this.getFromApi(city);

    await this.redis.client.set(cacheKey, JSON.stringify(data), {
      EX: 300,
    });

    return new OkResponseDto(data);
  }

  async getFromApi(city: string) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${this.weatherConf.weatherApiKey}&q=${city}&aqi=no`;

    const response = await retry(
      async () => {
        const response = await axios.get<unknown>(url);

        return response;
      },
      {
        retries: 3,
        factor: 1,
        onRetry: async (error: any, attempt: number) => {
          this.logger.warn(
            `Retry attempt ${attempt} due to error: ${error.message}`,
          );
        },
      },
    );

    return response.data;
  }
}
