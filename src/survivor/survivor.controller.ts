import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { UpdateSurvivorDto } from './dto/update-survivor.dto';
import { SurvivorService } from './survivor.service';
import { PaginatedSurvivorDto } from './dto/list-survivors.dto';

@Controller('survivors')
export class SurvivorController {
  constructor(private readonly survivorService: SurvivorService) {}

  //create token too
  @Post()
  create(@Body() createSurvivorDto: CreateSurvivorDto) {
    return this.survivorService.create(createSurvivorDto);
  }

  @Get()
  list(@Body() paginatedSurvivorDto: PaginatedSurvivorDto) {
    return this.survivorService.list(paginatedSurvivorDto);
  }

  @Patch()
  update(@Body() updateSurvivorDto: UpdateSurvivorDto) {
    // get it from context userId/survivorId
    const id = 3;
    return this.survivorService.update(id, updateSurvivorDto);
  }

  @Post('items')
  updateItems(@Param('id') id: number, @Body() updateSurvivorDto: UpdateSurvivorDto) {
    return this.survivorService.update(id, updateSurvivorDto);
  }
}
