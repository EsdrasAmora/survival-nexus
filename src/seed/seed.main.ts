import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

async function run() {
  const app = await NestFactory.create(SeedModule);
  app.enableShutdownHooks();
  await app.init();
  const seeder = app.get(SeedService);
  await seeder.seed();
  await app.close();
}
void run();
