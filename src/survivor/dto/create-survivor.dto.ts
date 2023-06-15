import {
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsOptional,
  IsBoolean,
  Validate,
  IsEmail,
  ValidateNested,
} from 'class-validator';
import { Gender } from '../entities/gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GeoLocation } from '../entities/location';
import { PasswordValidator } from '../../shared/password.validator';

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
  @ValidateNested()
  @ApiPropertyOptional()
  lastLocation: GeoLocation;

  @IsBoolean()
  @ApiProperty()
  infected: boolean;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Validate(PasswordValidator)
  @ApiProperty()
  password: string;
}
