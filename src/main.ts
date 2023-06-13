import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { findManySurvivors } from './survivor/survivor.generated-queries';
import { Client } from 'pg';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const dbConfig = {
  //   host: 'localhost',
  //   user: 'survival_nexus_user',
  //   password: 'survival_nexus_password',
  //   database: 'survival_nexus_db',
  //   port: 5432,
  // };
  console.log(process.env.DATABASE_URL);
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const survivors = await findManySurvivors.run({ cursorId: 0, limit: 11 }, client);

  console.log(survivors.find((survivor) => survivor.id === 11));
  throw 'asdasd';

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
void bootstrap();
