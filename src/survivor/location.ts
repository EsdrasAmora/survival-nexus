import { ApiProperty } from '@nestjs/swagger';

export class GeoLocation {
  @ApiProperty()
  lat: number;

  @ApiProperty()
  lng: number;
}
