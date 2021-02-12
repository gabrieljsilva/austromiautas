import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthenticateGuard } from './authenticate.guard';
import { ProtectGuard } from './protect.guard';

export const Protect = (...decorators: any[]) =>
  applyDecorators(UseGuards(AuthenticateGuard), UseGuards(ProtectGuard), ...decorators);
