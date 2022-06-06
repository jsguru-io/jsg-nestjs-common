import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MIGRATOR_TOKEN, MODEL_FACTORY_TOKEN, SEQUELIZE_TOKEN } from './const';
import { migratorFactory, sequelizeFactory } from './factory';
import { MigratorCommand } from './command';
import { ModelFactory } from './factory/model.factory';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE_TOKEN,
    useFactory: sequelizeFactory,
    inject: [ConfigService],
  },
  {
    provide: MIGRATOR_TOKEN,
    useFactory: migratorFactory,
    inject: [SEQUELIZE_TOKEN],
  },
  {
    provide: MODEL_FACTORY_TOKEN,
    useClass: ModelFactory,
  },
  MigratorCommand,
];
