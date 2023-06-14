import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { JwtService } from './jwt.service';

export type TokenData = ReturnType<typeof JwtService.prototype.verify>['data'];

export const Token = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.token;
});
