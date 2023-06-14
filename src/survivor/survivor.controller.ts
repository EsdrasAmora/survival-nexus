import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateSurvivorDto } from './dto/update-survivor.dto';
import { SurvivorService } from './survivor.service';
import { PaginatedSurvivorDto } from './dto/list-survivors.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Token, TokenData } from '../auth/token-data.decorator';
import { UpdateSuvivorItemDto } from './dto/update-suvivor-item.dto';
import { TradeSuvivorItemDto } from './dto/trade-suvivor-item.dto';

@Controller('survivors')
@UseGuards(AuthGuard)
export class SurvivorController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Get()
  list(@Body() paginatedSurvivorDto: PaginatedSurvivorDto) {
    return this.survivorService.list(paginatedSurvivorDto);
  }

  @Post('items/trade')
  trade(@Token() { survivorId }: TokenData, @Body() data: TradeSuvivorItemDto) {
    return this.survivorService.trade(survivorId, data);
  }

  @Post('items')
  updateItems(@Token() { survivorId }: TokenData, @Body() data: UpdateSuvivorItemDto) {
    return this.survivorService.updateItems(survivorId, data);
  }

  @Patch()
  update(@Token() { survivorId }: TokenData, @Body() data: UpdateSurvivorDto) {
    return this.survivorService.update(survivorId, data);
  }
}
