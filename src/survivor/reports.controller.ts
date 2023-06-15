import { Controller, Get, Post } from '@nestjs/common';
import { SurvivorService } from './survivor.service';

@Controller('reports')
export class ReportsController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Post('survivors-infected')
  infectedSurvivors() {
    return this.survivorService.infectedSurvivorsReport();
  }

  @Get('items-per-survivor')
  itemsPerSurvivors() {
    return this.survivorService.itemsPerSurvivorsReport();
  }
}
