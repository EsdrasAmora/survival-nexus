import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Validate } from 'class-validator';
import { PasswordValidator } from '../../shared/password.validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @Validate(PasswordValidator)
  @ApiProperty()
  password: string;
}
