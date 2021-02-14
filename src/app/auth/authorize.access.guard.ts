import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthorizeAccessGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const passiveToken = request.headers.token;
    const requestHost = request.hostname;

    if (!passiveToken) throw new ForbiddenException('passive token not provided');

    const accessTokenIsInvalid = !(await this.authService.validateAccessToken(passiveToken, requestHost));

    if (accessTokenIsInvalid) {
      throw new ForbiddenException('invalid passive token');
    }

    return true;
  }
}
