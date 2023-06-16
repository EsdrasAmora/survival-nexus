import { ApiProperty } from '@nestjs/swagger';
import { Survivor } from './survivor.entity';

export class PaginatedSurvivor {
  @ApiProperty()
  remaining: number;

  @ApiProperty({ type: [Survivor] })
  survivors: Survivor[];
}
