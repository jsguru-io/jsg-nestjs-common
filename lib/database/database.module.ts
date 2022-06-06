import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { MIGRATOR_TOKEN, MODEL_FACTORY_TOKEN, SEQUELIZE_TOKEN } from './const';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [...databaseProviders],
  exports: [SEQUELIZE_TOKEN, MIGRATOR_TOKEN, MODEL_FACTORY_TOKEN],
})
export class DatabaseModule {}
