import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage } from 'umzug';
import { Migrator } from '../migrator';
import { IMigrator } from '../type';
import { DatabaseModuleOptions } from '../type/options.type';

export const migratorFactory = async (
  sequelize: Sequelize,
  options?: DatabaseModuleOptions,
): Promise<IMigrator> => {
  return new Migrator({
    migrationsGlob:
      options?.migrator?.glob ?? '**/{migrations,migration}/*.migration.ts',
    migrationsPath:
      options?.migrator?.path ?? `${__dirname}/../../../migration/`,
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
    }),
    logger: console,
  });
};
