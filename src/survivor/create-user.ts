import { ConflictException } from '@nestjs/common';
import { z } from 'zod';
import { findSurvivorByEmail } from './survivor.generated-queries';
import { CryptoService } from '../auth/crypto.service';
import { DbClient } from '../shared/db.service';
import { AppConfigService } from '../shared/env.service';

export class CreateUser {
  constructor(
    private cryptoService: CryptoService,
    private dbClient: DbClient,
    private configService: AppConfigService,
  ) {}

  async execute(input: z.input<typeof this.schema>) {
    const [sameEmailUser] = await findSurvivorByEmail.run({ email: input.email }, this.dbClient);

    if (sameEmailUser) {
      throw new ConflictException('Email already in use');
    }

    const passwordSalt = this.cryptoService.createSalt();
    const hashedPassword = this.cryptoService.hashSaltPassword(input.password, passwordSalt);
  }

  schema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(this.configService.get('PASSWORD_MIN_LENGTH'))
      .superRefine((value, ctx) => {
        if (value.match(/\d/) === null) {
          ctx.addIssue({ code: 'custom', message: 'Must contain at least one digit' });
        }
        if (value.match(/[a-z]/) === null) {
          ctx.addIssue({ code: 'custom', message: 'Must contain at least one lowercase letter' });
        }
        if (value.match(/[A-Z]/) === null) {
          ctx.addIssue({ code: 'custom', message: 'Must contain at least one uppercase letter' });
        }
      }),
  });
}
