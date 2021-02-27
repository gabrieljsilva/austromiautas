import { Controller, Put, Query } from '@nestjs/common';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';

import { UsersActions } from './users.actions';

import { Protect } from '../auth/protect.decorator';

@ApiTags('users')
@ApiSecurity('basic')
@Protect()
@Controller('users')
export class UsersController {
  constructor(private readonly usersAction: UsersActions) {}

  @Put('activate')
  async activateUser(@Query('token') token: string) {
    return this.usersAction.activateUser(token);
  }
}
