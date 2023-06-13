import { ApiProperty } from '@nestjs/swagger';

export class SuvivorItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
