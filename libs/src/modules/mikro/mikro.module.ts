import { DynamicModule, Global, Module } from '@nestjs/common';
import { MikroModuleAsyncOptions } from './interfaces';
import { TaskEntity, UserEntity, UserTokenEntity } from './entities';
import {
  TaskRepository,
  UserRepository,
  UserTokenRepository,
} from './repositories';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  PostgreSqlDriver,
  ReflectMetadataProvider,
} from '@mikro-orm/postgresql';
import { DatabaseConfig } from '../../config';

const entities = [UserEntity, UserTokenEntity, TaskEntity];
const providers = [UserRepository, UserTokenRepository, TaskRepository];

@Global()
@Module({})
export class MikroModule {
  public static forRootAsync(options: MikroModuleAsyncOptions): DynamicModule {
    return {
      module: MikroModule,
      imports: [
        ...(options?.imports || []),
        MikroOrmModule.forRootAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: (config: DatabaseConfig) => ({
            allowGlobalContext: true,
            dbName: config.dbName,
            user: config.username,
            password: config.password,
            host: config.host,
            port: config.port,
            autoLoadEntities: true,
            driver: PostgreSqlDriver,
            ignoreUndefinedInQuery: true,
            metadataProvider: ReflectMetadataProvider,
            ...(config.supportSsl && {
              driverOptions: {
                connection: { ssl: { rejectUnauthorized: false } },
              },
            }),
          }),
        }),
        MikroOrmModule.forFeature(entities),
      ],
      providers,
      exports: providers,
    };
  }
}
