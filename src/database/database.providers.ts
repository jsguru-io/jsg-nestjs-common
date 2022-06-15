import { Provider } from '@nestjs/common';
import {
  DATABASE_OPTIONS_TOKEN,
  MIGRATOR_TOKEN,
  MODEL_FACTORY_TOKEN,
  SEQUELIZE_TOKEN,
} from './const';
import { migratorFactory, sequelizeFactory } from './factory';
import { MigratorCommand } from './command';
import { ModelFactory } from './factory/model.factory';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE_TOKEN,
    useFactory: sequelizeFactory,
    inject: [DATABASE_OPTIONS_TOKEN],
  },
  {
    provide: MIGRATOR_TOKEN,
    useFactory: migratorFactory,
    inject: [SEQUELIZE_TOKEN, DATABASE_OPTIONS_TOKEN],
  },
  {
    provide: MODEL_FACTORY_TOKEN,
    useClass: ModelFactory,
  },
  MigratorCommand,
];
