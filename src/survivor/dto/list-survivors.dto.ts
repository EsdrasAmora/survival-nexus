import { ApiProperty } from '@nestjs/swagger';

export class PaginatedSurvivorDto {
  @ApiProperty()
  limit: number;

  @ApiProperty()
  cursorId: number;
}
