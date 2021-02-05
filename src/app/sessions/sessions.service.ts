import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class SessionsService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const userNotExists = !user;

    if (userNotExists) {
      return null;
    }

    if (user.status !== 'active') {
      return null;
    }

    try {
      await compare(password, user.password);
    } catch {
      return null;
    }

    return user;
  }

  async issueAccessToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
