import { IsNotEmpty, IsEnum, IsBoolean, Validate, IsEmail, ValidateNested, IsDate } from 'class-validator';
import { Gender } from '../entities/gender.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GeoLocation } from '../entities/location';
import { PasswordValidator } from '../../shared/password.validator';
import { Type } from 'class-transformer';

export class CreateSurvivorDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsDate()
  @ApiProperty()
  birthday: Date;

  @IsEnum(Gender)
  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiPropertyOptional({ type: GeoLocation })
  @ValidateNested()
  @Type(() => GeoLocation)
  lastLocation?: GeoLocation | null;

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
