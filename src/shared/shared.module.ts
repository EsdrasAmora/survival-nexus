import { Global, Module } from '@nestjs/common';
import { DbClient } from './db.service';

@Global()
@Module({
  providers: [DbClient],
  exports: [DbClient],
})
export class SharedModule {}
