import { Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from '../../shared/database/entities/User';

@Injectable()
export class AuthActions {
  constructor(private readonly authService: AuthService) {}

  async login(user: User) {
    const accessToken = await this.authService.issueAccessToken(user.id);
    delete user.password;
    return { accessToken };
  }
}
