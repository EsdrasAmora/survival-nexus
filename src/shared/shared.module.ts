import { Global, Module } from '@nestjs/common';
import { DbClient } from './db.service';
import { AppConfigService } from './env.service';

@Global()
@Module({
  providers: [DbClient, AppConfigService],
  exports: [DbClient, AppConfigService],
})
export class SharedModule {}
