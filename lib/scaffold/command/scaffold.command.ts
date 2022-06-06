import { Inject, Injectable } from '@nestjs/common';
import { Command, Positional } from 'nestjs-command';
import { SCAFFOLD_SERVICE_TOKEN } from '../const';
import { IScaffoldService } from '../type';

@Injectable()
export class ScaffoldCommand {
  constructor(
    @Inject(SCAFFOLD_SERVICE_TOKEN)
    private readonly scaffoldService: IScaffoldService,
  ) {}

  @Command({
    command: 'scaffold <modelName>',
    describe: 'Create new migration file',
  })
  async up(
    @Positional({
      name: 'modelName',
      describe: 'Name of the model in PascalCase format',
      type: 'string',
    })
    modelName: string,
  ): Promise<void> {
    await this.scaffoldService.scaffold(modelName);
  }
}
