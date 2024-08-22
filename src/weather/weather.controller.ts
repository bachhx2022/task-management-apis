import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IdResponse } from '@app/libs';
import { WeatherService } from './weather.service';
import { Authorize } from '../decorators';

@ApiTags('weather')
@Controller({
  path: 'weather',
  version: '1',
})
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @Authorize()
  @ApiOkResponse({ type: IdResponse })
  getDetails(@Query('city') city: string) {
    return this.weatherService.getDetails(city);
  }
}
