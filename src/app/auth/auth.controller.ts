import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { User } from '../utils/user.decorator';
import { User as UserEntity } from '../../shared/database/entities/User';
import { AuthActions } from './auth.actions';
import { CreateSessionDTO } from './DTO/create.dto';

import { Protect } from './protect.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authActions: AuthActions) {}

  @ApiBody({ type: CreateSessionDTO })
  @Protect(UseGuards(AuthGuard('local')))
  @Post('login')
  async login(@User() user: UserEntity) {
    return this.authActions.login(user);
  }
}
