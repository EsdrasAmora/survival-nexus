import crypto from 'crypto';
import { AppConfigService } from '../shared/env.service';

export class CryptoService {
  constructor(private config: AppConfigService) {}

  createSalt() {
    return crypto.randomBytes(this.config.get('CRYPTO_DEFAULT_PASSWORD_LENGTH')).toString('hex');
  }

  hashSaltPassword(password: string, salt: string) {
    return crypto.scryptSync(password + salt, this.config.get('SECRET_PASSWORD_SALT'), 64).toString('base64');
  }
}
