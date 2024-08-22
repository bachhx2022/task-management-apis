import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto, toLowercase } from '@app/libs';

class WeatherCondition {
  @ApiProperty({
    description: 'Weather condition text',
  })
  text: string;

  @ApiProperty({
    description: 'Weather condition icon',
  })
  icon: string;
}

class CurrentWeather {
  @ApiProperty({
    description: 'Temperature in Celsius',
  })
  temp_c: number;

  @ApiProperty({
    description: 'Weather condition',
  })
  condition: WeatherCondition;

  @ApiProperty({
    description: 'Wind speed in km/h',
  })
  wind_kph: number;

  @ApiProperty({
    description: 'Wind direction in degrees',
  })
  pressure_mb: number;

  @ApiProperty({
    description: 'Precipitation in mm',
  })
  precip_mm: number;

  @ApiProperty({
    description: 'Humidity in percentage',
  })
  humidity: number;

  @ApiProperty({
    description: 'Cloud cover in percentage',
  })
  cloud: number;

  @ApiProperty({
    description: 'Feels like temperature in Celsius',
  })
  feelslike_c: number;
}

class LocationAtt {
  @ApiProperty({
    description: 'Location name',
  })
  name: string;

  @ApiProperty({
    description: 'Region name',
  })
  country: string;
}

export type GetWeatherDetailsResponse = ResponseDto<{
  
  location: LocationAtt;
  current: CurrentWeather;
}>

