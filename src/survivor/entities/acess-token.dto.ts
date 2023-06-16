import { ApiProperty } from '@nestjs/swagger';

export class AcessTokenDto {
  @ApiProperty()
  acessToken: string;
}
