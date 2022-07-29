import { Sequelize } from 'sequelize-typescript';
import * as _ from 'lodash';
import { DatabaseModuleOptions } from '../type/options.type';

export const sequelizeFactory = async (
  options?: DatabaseModuleOptions,
): Promise<Sequelize> => {
  if (!options) {
    return new Sequelize();
  }
  const { connection } = options;

  return new Sequelize({
    dialect: 'postgres',
    host: connection.host,
    port: +connection.port,
    username: connection.username,
    password: connection.password,
    database: connection.database,
    // models: [`${__dirname}/../../../**/*.model.{ts,js}`],
    models: connection.models ?? [],
    logging: connection.logging ?? false,
    modelMatch: (filename: string, member) => {
      const exportedMember: string = filename.substring(
        0,
        filename.indexOf('.model'),
      );
      const convertedMember: string = _.camelCase(exportedMember);

      return convertedMember.toLocaleLowerCase() === member.toLowerCase();
    },
  });
};
