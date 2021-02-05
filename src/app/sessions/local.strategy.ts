import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { SessionsService } from './sessions.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private sessionsService: SessionsService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.sessionsService.validateUser(email, password);

    const userIsInvalid = !user;

    if (userIsInvalid) {
      throw new UnauthorizedException('invalid credentials');
    }

    delete user.password;
    return user;
  }
}
