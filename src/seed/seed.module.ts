import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from '../shared/env.service';
import { MigrationService } from './migrate.service';

@Module({
  providers: [SeedService, MigrationService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.development', '.env'],
      validate: (config) => AppConfigService.EnvSchema.parse(config),
    }),
    SharedModule,
    AuthModule,
  ],
})
export class SeedModule {}
