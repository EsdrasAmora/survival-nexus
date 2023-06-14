import { verify, sign } from 'jsonwebtoken';
import { z } from 'zod';
import { AppConfigService } from '../shared/env.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
  private readonly BEARER: string = 'Bearer';
  private readonly jwtSchema = z.object({
    data: z.object({ survivorId: z.number().int().min(1) }),
    iat: z.number().int(),
    exp: z.number().int(),
  });

  constructor(private config: AppConfigService) {}

  verify(token: string) {
    const splitToken = token.split(' ')[1];
    return this.jwtSchema.parse(verify(splitToken, this.config.get('JWT_SECRET')));
  }

  sign(payload: object): string {
    const token = sign({ data: payload }, this.config.get('JWT_SECRET'), {
      expiresIn: this.config.get('JWT_EXPIRATION_TIME'),
    });
    return `${this.BEARER} ${token}`;
  }
}
