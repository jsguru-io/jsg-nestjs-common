import { SequelizeOptions } from 'sequelize-typescript';
import { InjectionToken } from '@nestjs/common';

export type ConnectionOptions = Pick<
  SequelizeOptions,
  'host' | 'port' | 'database' | 'username' | 'password' | 'ssl' | 'logging'
>;

export interface MigratorOptions {
  glob?: string;
  path: string;
}

export interface DatabaseModuleOptions {
  connection: ConnectionOptions;
  migrator: MigratorOptions;
}

export interface RegisterAsyncOptions {
  useFactory: (...args: any[]) => DatabaseModuleOptions;
  inject: InjectionToken[];
}

export interface RegisterOptions {
  useValue: DatabaseModuleOptions;
}
