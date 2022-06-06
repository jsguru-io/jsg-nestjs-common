import { Model } from 'sequelize-typescript';
import { CreationAttributes, Attributes } from 'sequelize/types/model';
import { Constructor } from '../../util';

export type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;
export type ModelPayload<T> = Partial<Omit<T, keyof Model<T>>>;
export type ModelAttributes<T extends Model> = Attributes<T>;
export type ModelCreationAttributes<T extends Model> = CreationAttributes<T>;
export type ResultsWithCountSet<T extends Model> = {
  rows: T[];
  count: number;
};
export type PaginationParams = {
  limit?: number;
  offset?: number;
};
