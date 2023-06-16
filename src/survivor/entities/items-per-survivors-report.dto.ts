import { ApiProperty } from '@nestjs/swagger';

export class ItemsPerSurvivorsReportDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  avarge: number;

  @ApiProperty()
  itemId: number;
}
