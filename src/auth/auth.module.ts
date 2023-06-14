import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { JwtService } from './jwt.service';

@Module({
  imports: [CryptoService, JwtService],
  exports: [CryptoService, JwtService],
})
export class AuthModule {}
