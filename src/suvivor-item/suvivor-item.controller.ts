import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSuvivorItemDto } from './dto/create-item.dto';
import { SuvivorItemService } from './suvivor-item.service';
import { SuvivorItem } from './entities/suvivor-item.entity';

@Controller('items')
export class SuvivorItemController {
  constructor(private readonly suvivorItemService: SuvivorItemService) {}

  @Post()
  create(@Body() createSuvivorItemDto: CreateSuvivorItemDto): Promise<number> {
    return this.suvivorItemService.create(createSuvivorItemDto);
  }

  @Get()
  findAll(): Promise<SuvivorItem[]> {
    return this.suvivorItemService.findAll();
  }
}
