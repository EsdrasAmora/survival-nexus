import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class PaginatedSurvivorDto {
  @ApiProperty()
  @IsPositive()
  limit: number;

  @ApiProperty()
  @IsInt()
  cursorId: number;
}
