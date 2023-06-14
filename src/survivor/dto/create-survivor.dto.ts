import { IsNotEmpty, IsDateString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { Gender } from '../gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional()
  lastLocation: GeoLocation;

  @IsBoolean()
  @ApiProperty()
  infected: boolean;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
