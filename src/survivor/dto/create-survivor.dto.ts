import { IsNotEmpty, IsDateString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Gender } from '../gender.enum';
import { ApiProperty } from '@nestjs/swagger';
import { GeoLocation } from '../location';

export class CreateSurvivorDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty()
  birthday: Date;

  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @IsOptional()
  @ApiProperty()
  lastLocation: GeoLocation;

  @IsBoolean()
  @ApiProperty()
  infected: boolean;
}
