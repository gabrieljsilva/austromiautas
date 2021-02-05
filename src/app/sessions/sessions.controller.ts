import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { User } from '../utils/user.decorator';
import { User as UserEntity } from '../../shared/database/entities/User';
import { SessionsActions } from './sessions.actions';
import { CreateSessionDTO } from './DTO/create.dto';

import { Protect } from './protect.decorator';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsActions: SessionsActions) {}

  @ApiBody({ type: CreateSessionDTO })
  @Protect('sessions', UseGuards(AuthGuard('local')))
  @Post()
  async create(@User() user: UserEntity) {
    return this.sessionsActions.create(user);
  }
}
