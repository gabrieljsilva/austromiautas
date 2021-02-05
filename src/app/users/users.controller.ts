import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { UsersActions } from './users.actions';

import { CreateUserDTO } from './dto/createuserDto';
import { Protect } from '../sessions/protect.decorator';
import { ValidationPipe } from '../utils/validation.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersAction: UsersActions) {}

  @ApiBody({ type: CreateUserDTO })
  @Protect('users')
  @Post()
  async create(@Body(new ValidationPipe()) userDTO: CreateUserDTO) {
    return this.usersAction.create(userDTO);
  }

  @Protect('users')
  @Get()
  async findAll() {
    return this.usersAction.list();
  }
}
