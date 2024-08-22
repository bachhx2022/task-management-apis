import { DynamicModule, Global, Module, RequestMethod } from '@nestjs/common';
import { LoggerModuleAsyncOptions } from './interfaces';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';
import { LoggerConfig } from '../../config';

@Global()
@Module({})
export class LoggerModule {
  public static forRootAsync(options: LoggerModuleAsyncOptions): DynamicModule {
    return {
      module: LoggerModule,
      imports: [
        ...(options?.imports || []),
        PinoLoggerModule.forRootAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: (config: LoggerConfig) => ({
            pinoHttp: {
              timestamp: () => {
                return `, "timestamp":"${new Date().toISOString()}"`;
              },
              level: config.level,
              transport: config.pretty ? { target: 'pino-pretty' } : undefined,
              formatters: {
                level: (label) => {
                  return { level: label.toUpperCase() };
                },
              },
              serializers: {
                req(req) {
                  req.body = req.raw.body;
                  return req;
                },
              },
              redact: ['req.headers.authorization', 'req.body.password'],
            },
            forRoutes: ['*'],
            exclude: [{ method: RequestMethod.ALL, path: 'check' }],
          }),
        }),
      ],
      providers: [],
      exports: [PinoLoggerModule],
    };
  }
}
