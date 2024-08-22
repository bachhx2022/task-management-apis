import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import {
  AuthConfig,
  authConfig,
  BaseAuthModule,
  databaseConfig,
  EncryptConfig,
  encryptConfig,
  loggerConfig,
  LoggerModule,
  MikroModule,
  MiscModule,
  redisConfig,
  RedisModule,
  weatherConfig,
} from '@app/libs';
import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        encryptConfig,
        authConfig,
        loggerConfig,
        redisConfig,
        weatherConfig,
      ],
    }),
    MiscModule.forRootAsync({
      inject: [encryptConfig.KEY],
      useFactory: (config: EncryptConfig) => config,
    }),
    BaseAuthModule.forRootAsync({
      inject: [authConfig.KEY],
      useFactory: (config: AuthConfig) => config,
    }),
    LoggerModule.forRootAsync({
      inject: [loggerConfig.KEY],
    }),

    MikroModule.forRootAsync({
      inject: [databaseConfig.KEY],
    }),
    RedisModule.forRootAsync({
      inject: [redisConfig.KEY],
    }),
    CommonModule,
    BaseAuthModule,
    AuthModule,
    TasksModule,
    UsersModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
