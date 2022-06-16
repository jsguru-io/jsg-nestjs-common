import { DynamicModule, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import {
  DATABASE_OPTIONS_TOKEN,
  MIGRATOR_TOKEN,
  MODEL_FACTORY_TOKEN,
  SEQUELIZE_TOKEN,
} from './const';
import { RegisterAsyncOptions, RegisterOptions } from './type/options.type';

@Module({
  imports: [],
  providers: [...databaseProviders],
  exports: [SEQUELIZE_TOKEN, MIGRATOR_TOKEN, MODEL_FACTORY_TOKEN],
})
export class DatabaseModule {
  static register(options: RegisterOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [],
      providers: [
        ...databaseProviders,
        { provide: DATABASE_OPTIONS_TOKEN, useValue: options.useValue },
      ],
      exports: [SEQUELIZE_TOKEN, MIGRATOR_TOKEN, MODEL_FACTORY_TOKEN],
    };
  }

  static registerAsync(options: RegisterAsyncOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [],
      providers: [
        ...databaseProviders,
        {
          provide: DATABASE_OPTIONS_TOKEN,
          useFactory: options.useFactory,
          inject: options.inject,
        },
      ],
      exports: [SEQUELIZE_TOKEN, MIGRATOR_TOKEN, MODEL_FACTORY_TOKEN],
    };
  }
}
