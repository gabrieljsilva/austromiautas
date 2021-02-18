import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const bearerToken = request.headers.authorization as string;
    const tokenWasSent = !!bearerToken;
    if (tokenWasSent) {
      const [bearer, token] = bearerToken.split(' ');
      if (bearer !== 'Bearer' || !token) {
        throw new ForbiddenException('invalid token');
      }

      try {
        const { sub: userId } = await this.jwtService.verifyAsync(token);
        const user = await this.usersService.findById(userId);
        delete user.password;
        request.user = user;
        return true;
      } catch {
        throw new ForbiddenException('invalid token');
      }
    }
    request.user = 'guest';
    return true;
  }
}
