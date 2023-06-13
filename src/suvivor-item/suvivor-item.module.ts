import { Module } from '@nestjs/common';
import { SuvivorItemService } from './suvivor-item.service';
import { SuvivorItemController } from './suvivor-item.controller';

@Module({
  controllers: [SuvivorItemController],
  providers: [SuvivorItemService],
})
export class SuvivorItemModule {}
