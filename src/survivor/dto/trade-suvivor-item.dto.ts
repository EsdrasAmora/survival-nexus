import { ApiProperty } from '@nestjs/swagger';
import { IsNotZero } from '../../shared/non-zero.validator';
import { IsInt, Min, Validate } from 'class-validator';

export class TradeSuvivorItemDto {
  @Min(1)
  @IsInt()
  @ApiProperty()
  itemId: number;

  @Validate(IsNotZero)
  @IsInt()
  @ApiProperty()
  quantity: number;

  @Min(1)
  @IsInt()
  @ApiProperty()
  fromSurvivorId: number;
}
