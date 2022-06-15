import { Inject, Injectable } from '@nestjs/common';
import { SEQUELIZE_TOKEN } from '../const';
import { Model, Sequelize } from 'sequelize-typescript';
import * as _ from 'lodash';
import { ModelCreationAttributes } from '../../crud';

@Injectable()
export class ModelFactory {
  constructor(@Inject(SEQUELIZE_TOKEN) private readonly sequelize: Sequelize) {}

  create<T extends Model = Model>(
    model,
    attributes?: ModelCreationAttributes<T>,
  ): T {
    return model.build(attributes, { sequelize: this.sequelize });
  }

  createMany<T extends Model = Model>(
    model,
    count: number,
    attributes?: ModelCreationAttributes<T>,
  ): T[] {
    const attributesList = _.range(0, count).map(() => attributes);

    return model.bulkBuild(attributesList, { sequelize: this.sequelize });
  }
}
