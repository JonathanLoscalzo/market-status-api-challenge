import * as df from 'dotenv-flow';

df.config({
  path: './environments/',
  node_env: process.env.NODE_ENV,
});

import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import configFactory from '../../core/config/configuration';
import entities from './database.entities';

const config = configFactory();

console.log(entities);
const datasource = new DataSource({
  ...(config.database as PostgresConnectionOptions),
  migrations: [__dirname + '/migrations/**.ts'],
  entities: entities,
});

// config is one that is defined in datasource.config.ts file
datasource.initialize();

export default datasource;
