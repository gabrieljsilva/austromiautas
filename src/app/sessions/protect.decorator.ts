import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { AuthenticateGuard } from './authenticate.guard';
import { ProtectGuard } from './protect.guard';

export const Protect = (resource: string, ...decorators: any[]) =>
  applyDecorators(
    UseGuards(AuthenticateGuard),
    SetMetadata('resource', resource),
    UseGuards(ProtectGuard),
    ...decorators,
  );
