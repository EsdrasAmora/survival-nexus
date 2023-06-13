import { Module } from '@nestjs/common';
import { SurvivorModule } from './survivor/survivor.module';
import { SuvivorItemModule } from './suvivor-item/suvivor-item.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from './shared/env.service';

@Module({
  imports: [
    SurvivorModule,
    SuvivorItemModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.development', '.env'],
      validate: (config) => EnvSchema.parse(config),
    }),
  ],
})
export class AppModule {}
