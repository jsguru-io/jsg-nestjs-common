import { Transform } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class QueryParamsDTO {
  @IsOptional()
  @IsNumber()
  @Transform((property) => +property.value ?? null)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Transform((property) => +property.value ?? null)
  offset?: number;
}
