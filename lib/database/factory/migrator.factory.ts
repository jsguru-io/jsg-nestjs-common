import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage } from 'umzug';
import { Migrator } from '../migrator';
import { IMigrator } from '../type';

export const migratorFactory = async (
  sequelize: Sequelize,
): Promise<IMigrator> => {
  return new Migrator({
    migrationsGlob: '**/migrations/*.migration.ts',
    migrationsPath: `${__dirname}/../migrations/`,
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
    }),
    logger: console,
  });
};
