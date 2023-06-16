import { Body, Controller, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UpdateSurvivorDto } from './dto/update-survivor.dto';
import { SurvivorService } from './survivor.service';
import { PaginatedSurvivorDto } from './dto/list-survivors.dto';
import { Token, TokenData } from '../auth/token-data.decorator';
import { TradeSuvivorItemDto } from './dto/trade-suvivor-item.dto';
import { PaginatedSurvivor } from './entities/paginated-survivor';
import { ApiBearerAuth, ApiExtraModels, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('survivors')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class SurvivorController {
  constructor(private readonly survivorService: SurvivorService) {}

  @ApiExtraModels(PaginatedSurvivor)
  @ApiResponse({
    status: 200,
    type: PaginatedSurvivor,
  })
  @Get()
  list(@Query() paginatedSurvivorDto: PaginatedSurvivorDto): Promise<PaginatedSurvivor> {
    return this.survivorService.list(paginatedSurvivorDto);
  }

  @Post('items/trade')
  trade(@Token() { survivorId }: TokenData, @Body() data: TradeSuvivorItemDto): Promise<void> {
    return this.survivorService.trade(survivorId, data);
  }

  @Patch()
  update(@Token() { survivorId }: TokenData, @Body() data: UpdateSurvivorDto): Promise<void> {
    return this.survivorService.update(survivorId, data);
  }
}
