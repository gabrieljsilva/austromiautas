import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from './auth.service';

@Injectable()
export class AuthorizeAccessGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const passiveToken = request.headers['x-api-token'];

    const requestHost = request.hostname;

    if (process.env.NODE_ENV !== 'development') {
      if (!passiveToken) throw new ForbiddenException('passive token not provided');

      const accessToken = await this.authService.findAccessToken(passiveToken, requestHost);

      const accessTokenIsInvalid = !accessToken;

      if (accessTokenIsInvalid) {
        throw new ForbiddenException('invalid passive token');
      }

      request.accessToken = accessToken;
    }

    request.accessToken = await this.authService.findAccessTokenByHost(requestHost);

    return true;
  }
}
