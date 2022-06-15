import { Sequelize } from 'sequelize-typescript';
import * as _ from 'lodash';
import { DatabaseModuleOptions } from '../type/options.type';

export const sequelizeFactory = async ({
  connection,
}: DatabaseModuleOptions): Promise<Sequelize> => {
  return new Sequelize({
    dialect: 'postgres',
    host: connection.host,
    port: +connection.port,
    username: connection.username,
    password: connection.password,
    database: connection.database,
    models: [`${__dirname}/../../../**/*.model.{ts,js}`],
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
