import { ApiProperty } from '@nestjs/swagger';

export class SurvivorItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;
}
