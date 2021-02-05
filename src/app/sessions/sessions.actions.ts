import { Injectable } from '@nestjs/common';

import { SessionsService } from './sessions.service';
import { User } from '../../shared/database/entities/User';

@Injectable()
export class SessionsActions {
  constructor(private readonly sessionsService: SessionsService) {}

  async create(user: User) {
    const accessToken = await this.sessionsService.issueAccessToken(user.id);
    delete user.password;
    return { accessToken, user };
  }
}
