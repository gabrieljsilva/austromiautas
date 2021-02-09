import { Controller, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersActions } from './users.actions';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersAction: UsersActions) {}

  @Put('activate')
  async activateUser(@Query('token') token: string) {
    return this.usersAction.activateUser(token);
  }
}