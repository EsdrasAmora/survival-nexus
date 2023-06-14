import { BadRequestException } from '@nestjs/common';
import { z } from 'zod';
import { CryptoService } from '../auth/crypto.service';
import { JwtService } from '../auth/jwt.service';
import { findSurvivorByEmail } from './survivor.generated-queries';
import { DbClient } from '../shared/db.service';

export class LoginUser {
  schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  constructor(private cryptoService: CryptoService, private jwtService: JwtService, private dbClient: DbClient) {}

  async execute(input: z.input<typeof this.schema>) {
    const [user] = await findSurvivorByEmail.run({ email: input.email }, this.dbClient);

    if (!user || this.cryptoService.hashSaltPassword(input.password, user.passwordSalt) !== user.hashedPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    return { authorization: this.jwtService.sign({ userId: user.id }) };
  }
}
