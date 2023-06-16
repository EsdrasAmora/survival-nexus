import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { InfectedSurvivorsReportDto } from './entities/infected-survivors-report.dto';
import { ItemsPerSurvivorsReportDto } from './entities/items-per-survivors-report.dto';

@Controller('reports')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ReportsController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Post('survivors-infected')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: InfectedSurvivorsReportDto,
  })
  infectedSurvivors(): Promise<InfectedSurvivorsReportDto> {
    return this.survivorService.infectedSurvivorsReport();
  }

  @Get('items-per-survivor')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    type: [ItemsPerSurvivorsReportDto],
  })
  itemsPerSurvivors(): Promise<ItemsPerSurvivorsReportDto[]> {
    return this.survivorService.itemsPerSurvivorsReport();
  }
}
