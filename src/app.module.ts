import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurvivorModule } from './survivor/survivor.module';

@Module({
  imports: [SurvivorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
