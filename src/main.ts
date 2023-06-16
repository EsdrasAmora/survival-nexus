import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from './shared/env.service';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true, transformOptions: { enableImplicitConversion: true } }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Survivor Nexus API')
    .setDescription('Survivor API - Saving the world one survivor at a time')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const appConfig = app.get(AppConfigService);

  SwaggerModule.setup('api', app, document);

  await app.listen(appConfig.get('PORT'));
}
void bootstrap();
