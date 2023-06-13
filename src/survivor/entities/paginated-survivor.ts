import { ApiProperty } from '@nestjs/swagger';
import { Survivor } from './survivor.entity';

export class PaginatedSurvivor {
  @ApiProperty()
  total: number;

  @ApiProperty()
  survivors: Survivor[];
}
