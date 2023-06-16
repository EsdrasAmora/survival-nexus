import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('reports')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Post('survivors-infected')
  infectedSurvivors(): Promise<any> {
    return this.survivorService.infectedSurvivorsReport();
  }

  @Get('items-per-survivor')
  itemsPerSurvivors(): Promise<any> {
    return this.survivorService.itemsPerSurvivorsReport();
  }
}
