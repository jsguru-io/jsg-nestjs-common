import { applyDecorators } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { DefaultScope } from 'sequelize-typescript';

export const DefaultLean = (options: FindOptions = {}) =>
  applyDecorators(
    DefaultScope(() => ({
      raw: true,
      nest: true,
      ...(options || {}),
    })) as ClassDecorator,
  );
