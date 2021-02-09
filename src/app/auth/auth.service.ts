import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    const userNotExists = !user;

    if (userNotExists) return null;
    if (user.status !== 'active') return null;

    const match = await compare(password, user.password);

    if (!match) return null;

    return user;
  }

  async issueAccessToken(userId: string) {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }
}
