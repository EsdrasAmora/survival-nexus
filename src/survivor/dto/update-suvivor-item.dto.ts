import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Validate } from 'class-validator';
import { IsNotZero } from '../../shared/non-zero.validator';

export class UpdateSuvivorItemDto {
  @Min(1)
  @IsInt()
  @ApiProperty()
  itemId: number;

  @Validate(IsNotZero)
  @IsInt()
  @ApiProperty()
  quantity: number;
}
