import { randomBytes, scryptSync } from 'crypto';
import { AppConfigService } from '../shared/env.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  constructor(private config: AppConfigService) {}

  createSalt() {
    return randomBytes(this.config.get('CRYPTO_DEFAULT_PASSWORD_LENGTH')).toString('hex');
  }

  hashSaltPassword(password: string, salt: string) {
    return scryptSync(password + salt, this.config.get('SECRET_PASSWORD_SALT'), 64).toString('base64');
  }
}
