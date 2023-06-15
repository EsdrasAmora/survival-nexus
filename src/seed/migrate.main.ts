import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { MigrationService } from './migrate.service';

async function run() {
  const app = await NestFactory.create(SeedModule);
  app.enableShutdownHooks();
  await app.init();
  const service = app.get(MigrationService);
  await service.migrate();
  await app.close();
}
void run();
