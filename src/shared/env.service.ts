import { z } from 'zod';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor(private readonly nestConfig: NestConfigService<EnvSchema, true>) {}

  get<T extends keyof EnvSchema>(propertyPath: T): EnvSchema[T] {
    return this.nestConfig.get(propertyPath);
  }

  static EnvSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string(),
    LOGGER_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    PASSWORD_MIN_LENGTH: z.coerce.number().default(8),
    SECRET_PASSWORD_SALT: z.string(),
    CRYPTO_DEFAULT_PASSWORD_LENGTH: z.coerce.number(),
    SERVER_DOMAIN: z.string().default('http://localhost:3000'),
    JWT_SECRET: z.string(),
    NO_COLOR: z.boolean().optional(),
    JWT_EXPIRATION_TIME: z.string().default('1d'),
    DATABASE_CONNECTION_LIMIT: z.coerce.number().default(30),
    DATABASE_CONNECTION_POOL_TIMEOUT: z.coerce.number().default(15),
    NODE_ENV: z.enum(['production', 'development', 'test']).default('production'),
  });
}

type EnvSchema = z.infer<(typeof AppConfigService)['EnvSchema']>;
