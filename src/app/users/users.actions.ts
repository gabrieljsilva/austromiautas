import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';

@Injectable()
export class UsersActions {
  constructor(private readonly usersService: UsersService, private readonly jwtSevice: JwtService) {}

  async activateUser(token: string) {
    try {
      const { userId } = await this.jwtSevice.verify(token, { subject: 'activation' });
      const userIsWaiting = await this.usersService.checkIfUserIsWaiting(userId);

      if (userIsWaiting) {
        const user = await this.usersService.activateUser(userId);
        delete user.password;
        return user;
      }

      throw new Error();
    } catch {
      throw new BadRequestException('invalid token');
    }
  }
}
