import { Module } from '@nestjs/common';
import { SurvivorService } from './survivor.service';
import { SurvivorController } from './survivor.controller';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';

@Module({
  controllers: [SurvivorController, UserController],
  providers: [SurvivorService],
  imports: [AuthModule],
})
export class SurvivorModule {}
