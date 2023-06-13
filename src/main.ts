import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './shared/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Survivor Nexus API')
    .setDescription('Survivor API - Saving the world one survivor at a time')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const appConfig = app.get(AppConfigService);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(appConfig.get('PORT'));
}
void bootstrap();
