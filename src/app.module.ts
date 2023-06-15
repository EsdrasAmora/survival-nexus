import { Module } from '@nestjs/common';
import { SurvivorModule } from './survivor/survivor.module';
import { SuvivorItemModule } from './suvivor-item/suvivor-item.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './shared/env.service';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    SurvivorModule,
    SuvivorItemModule,
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.development', '.env'],
      validate: (config) => AppConfigService.EnvSchema.parse(config),
    }),
    AuthModule,
    SeedModule,
  ],
})
export class AppModule {}
