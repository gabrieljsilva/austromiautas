import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersActions } from './users.actions';

import { User } from '../../shared/database/entities/User';
import { Role } from '../../shared/database/entities/Role';

import { EmailsService } from '../emails/emails.service';

const JwtModuleConfig = {
  secret: process.env.APP_SECRET,
  signOptions: { expiresIn: '24h' },
};

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), JwtModule.register(JwtModuleConfig)],
  controllers: [UsersController],
  providers: [UsersService, UsersActions, EmailsService],
  exports: [UsersService],
})
export class UsersModule {}
