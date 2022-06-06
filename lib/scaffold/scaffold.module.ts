import { Module } from '@nestjs/common';
import { ScaffoldService } from './scaffold.service';
import { SCAFFOLD_SERVICE_TOKEN } from './const';
import { ScaffoldCommand } from './command';

@Module({
  providers: [
    {
      provide: SCAFFOLD_SERVICE_TOKEN,
      useClass: ScaffoldService,
    },
    ScaffoldCommand,
  ],
  exports: [SCAFFOLD_SERVICE_TOKEN],
})
export class ScaffoldModule {}
