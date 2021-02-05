import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProtectGuard implements CanActivate {
  constructor(private usersService: UsersService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const method = request.method;
    const resource = this.reflector.get<string>('resource', context.getHandler());

    if (user === 'guest') {
      const hasPermission = await this.usersService.checkGuestPermission(resource, method);
      return hasPermission;
    }

    const hasPermission = await this.usersService.checkUserPermission(request.user.id, resource, method);
    return hasPermission;
  }
}
