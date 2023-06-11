import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { CreateSurvivorDto } from './dto/create-survivor.dto';
import { UpdateSurvivorDto } from './dto/update-survivor.dto';

@Controller('survivor')
export class SurvivorController {
  constructor(private readonly survivorService: SurvivorService) {}

  @Post()
  create(@Body() createSurvivorDto: CreateSurvivorDto) {
    return this.survivorService.create(createSurvivorDto);
  }

  @Get()
  findAll() {
    return this.survivorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.survivorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSurvivorDto: UpdateSurvivorDto) {
    return this.survivorService.update(+id, updateSurvivorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.survivorService.remove(+id);
  }
}
