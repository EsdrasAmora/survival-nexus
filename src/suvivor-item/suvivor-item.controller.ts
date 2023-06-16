import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateSuvivorItemDto } from './dto/create-item.dto';
import { SuvivorItemService } from './suvivor-item.service';
import { Item } from './entities/suvivor-item.entity';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@Controller('items')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class SuvivorItemController {
  constructor(private readonly suvivorItemService: SuvivorItemService) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: Number,
  })
  create(@Body() createSuvivorItemDto: CreateSuvivorItemDto): Promise<number> {
    return this.suvivorItemService.create(createSuvivorItemDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [Item],
  })
  findAll(): Promise<Item[]> {
    return this.suvivorItemService.findAll();
  }
}
