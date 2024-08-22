import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

import { defineConfig } from '@mikro-orm/postgresql';


export default defineConfig({
  entities: ['./dist/**/*.entity.js'],
  // entitiesTs: ['./libs/**/*.entity.ts'],
  host: process.env.APP_DATABASE_HOST,
  port: +process.env.APP_DATABASE_PORT,
  dbName: process.env.APP_DATABASE_NAME,
  user: process.env.APP_DATABASE_USERNAME,
  password: process.env.APP_DATABASE_PASSWORD,
  driver: PostgreSqlDriver,
  extensions: [Migrator],
  ...(process.env.APP_DATABASE_SUPPORT_SSL === 'true' && {
    driverOptions: {
      connection: { ssl: { rejectUnauthorized: false } },
    },
  }),
  migrations: {
    path: './mikro/migrations',
  },
});
