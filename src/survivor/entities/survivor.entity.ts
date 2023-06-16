import { Gender } from './gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GeoLocation } from './location';
import { SurvivorItem } from './survivor-item';

export class Survivor {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: Date;

  @ApiProperty()
  gender: Gender;

  @ApiPropertyOptional({ type: GeoLocation })
  lastLocation: GeoLocation | null;

  @ApiProperty()
  infected: boolean;

  @ApiProperty({ type: [SurvivorItem] })
  items: SurvivorItem[];
}
