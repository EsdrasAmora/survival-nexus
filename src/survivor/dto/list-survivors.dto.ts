import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min } from 'class-validator';

export class PaginatedSurvivorDto {
  @ApiProperty({ default: 10 })
  @Min(1)
  @IsInt()
  @IsNumber()
  limit: number;

  @ApiProperty({ default: 1 })
  @Min(1)
  @IsInt()
  @IsNumber()
  cursorId: number;
}
