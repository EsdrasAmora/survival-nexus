import { Module } from '@nestjs/common';
import { SurvivorModule } from './survivor/survivor.module';
import { SuvivorItemModule } from './suvivor-item/suvivor-item.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SurvivorModule, SuvivorItemModule, SharedModule],
})
export class AppModule {}
