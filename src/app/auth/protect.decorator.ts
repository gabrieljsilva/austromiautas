import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthenticateGuard } from './authenticate.guard';
import { ProtectGuard } from './protect.guard';
import { AuthorizeAccessGuard } from './authorize.access.guard';

export const Protect = (...decorators: any[]) =>
  applyDecorators(UseGuards(AuthorizeAccessGuard, AuthenticateGuard, ProtectGuard), ...decorators);
