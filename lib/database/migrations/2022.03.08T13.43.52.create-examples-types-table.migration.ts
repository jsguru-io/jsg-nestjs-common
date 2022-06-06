import sequelize, { DataTypes } from 'sequelize';
import { IMigratorOptions } from '../type';
import { v4 as uuidv4 } from 'uuid';

export const up = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.createTable('examples_types', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  });

  await context.bulkInsert(
    'examples_types',
    [1, 2, 3, 4].map((num: number) => ({
      id: uuidv4(),
      name: `Test Example Type #${num}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    })),
  );
};

export const down = async ({ context }: IMigratorOptions): Promise<void> => {
  await context.dropTable('examples_types');
};
