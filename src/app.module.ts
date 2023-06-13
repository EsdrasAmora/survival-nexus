import { Module } from '@nestjs/common';
import { SurvivorModule } from './survivor/survivor.module';
import { SuvivorItemModule } from './suvivor-item/suvivor-item.module';

@Module({
  imports: [SurvivorModule, SuvivorItemModule],
})
export class AppModule {}
