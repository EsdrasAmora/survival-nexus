import { Gender } from '../gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GeoLocation } from '../location';

export class Survivor {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  gender: Gender;

  @ApiPropertyOptional()
  lastLocation: GeoLocation | null;

  @ApiProperty()
  infected: boolean;
}
