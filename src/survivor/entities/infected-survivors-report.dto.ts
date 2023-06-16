import { ApiProperty } from '@nestjs/swagger';

export class InfectedSurvivorsReportDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  infected: number;
}
