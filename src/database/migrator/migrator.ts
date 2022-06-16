import { Umzug } from 'umzug';
import {
  ICreateMigrationOptions,
  IMigrationMeta,
  IMigrator,
  IMigratorOptions,
  MigrateDownOptions,
} from '../type';
import * as fs from 'fs';
import * as path from 'path';

export class Migrator implements IMigrator {
  private migrationsPath = '';
  private driver: Umzug;

  constructor(options: IMigratorOptions) {
    this.setMigrationsPath(options.migrationsPath);
    this.initDriver(options);
  }

  private initDriver(options: IMigratorOptions): void {
    this.driver = new Umzug({
      migrations: {
        glob: options.migrationsGlob,
      },
      context: options.context,
      storage: options.storage,
      logger: options.logger,
      create: {
        template: (filepath) => [
          [
            filepath,
            fs
              .readFileSync(path.join(__dirname, 'sample-migration.tmp'))
              .toString(),
          ],
        ],
      },
    });
  }

  getMigrationsPath(): string {
    return this.migrationsPath;
  }

  setMigrationsPath(path: string): void {
    this.migrationsPath = path;
  }

  async create({ name, folder }: ICreateMigrationOptions): Promise<void> {
    return this.driver.create({
      name: `${name}.migration.ts`,
      folder: folder ?? this.getMigrationsPath(),
      prefix: 'TIMESTAMP',
      allowConfusingOrdering: true,
    });
  }

  async up(): Promise<IMigrationMeta[]> {
    return this.driver.up();
  }

  async down(options?: MigrateDownOptions): Promise<IMigrationMeta[]> {
    return this.driver.down(options);
  }
}
