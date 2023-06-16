import { Module } from '@nestjs/common';
import { SuvivorItemService } from './suvivor-item.service';
import { SuvivorItemController } from './suvivor-item.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [SuvivorItemController],
  providers: [SuvivorItemService],
  imports: [AuthModule],
})
export class SuvivorItemModule {}
