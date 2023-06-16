import { Module } from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { SurvivorController } from './survivor.controller';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { ReportsController } from './reports.controller';

@Module({
  controllers: [SurvivorController, UserController, ReportsController],
  providers: [SurvivorService],
  imports: [AuthModule],
})
export class SurvivorModule {}
