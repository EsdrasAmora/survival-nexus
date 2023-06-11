import { Module } from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { SurvivorController } from './survivor.controller';

@Module({
  controllers: [SurvivorController],
  providers: [SurvivorService],
})
export class SurvivorModule {}
