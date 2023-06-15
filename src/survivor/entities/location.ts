import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude } from 'class-validator';

export class GeoLocation {
  @IsLatitude()
  @ApiProperty()
  lat: number;

  @IsLongitude()
  @ApiProperty()
  lng: number;
}
