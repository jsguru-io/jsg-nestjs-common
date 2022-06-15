import { Inject, Injectable } from '@nestjs/common';
import { MIGRATOR_TOKEN } from '../const';
import { Command, Positional } from 'nestjs-command';
import { IMigrator } from '../type';

@Injectable()
export class MigratorCommand {
  constructor(@Inject(MIGRATOR_TOKEN) private readonly migrator: IMigrator) {}

  @Command({
    command: 'migrate',
    describe: 'Performs database migrations',
  })
  async up(): Promise<void> {
    await this.migrator.up();
  }

  @Command({
    command: 'migrate:down',
    describe: 'Reverts database migrations',
  })
  async down(): Promise<void> {
    await this.migrator.down();
  }

  @Command({
    command: 'migrate:reset',
    describe: 'Reverts database migrations',
  })
  async reset(): Promise<void> {
    await this.migrator.down({ to: <string | 0>0 });
  }

  @Command({
    command: 'migration:create <migration>',
    describe: 'Create new migration file',
  })
  async createMigration(
    @Positional({
      name: 'migration',
      describe: 'Name of the migration file',
      type: 'string',
    })
    migration: string,
  ): Promise<void> {
    await this.migrator.create({
      name: migration,
    });
  }
}
