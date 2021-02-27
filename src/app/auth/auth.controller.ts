import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiSecurity } from '@nestjs/swagger';

import { User } from '../utils/user.decorator';
import { User as UserEntity } from '../../shared/database/entities/User';
import { AuthActions } from './auth.actions';
import { CreateSessionDTO } from './DTO/create.dto';

import { Protect } from './protect.decorator';

@ApiTags('auth')
@ApiSecurity('basic')
@Protect()
@Controller('auth')
export class AuthController {
  constructor(private readonly authActions: AuthActions) {}

  @ApiBody({ type: CreateSessionDTO })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@User() user: UserEntity) {
    return this.authActions.login(user);
  }
}
