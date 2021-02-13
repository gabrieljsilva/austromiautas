import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DonatorsController } from './donators.controller';
import { DonatorsService } from './donators.service';
import { DonatorsActions } from './donators.actions';
import { EmailsService } from '../emails/emails.service';

import { Donator } from '../../shared/database/entities/Donator';
import { User } from '../../shared/database/entities/User';
import { Role } from '../../shared/database/entities/Role';
import { UserRole } from '../../shared/database/entities/UserRole';

@Module({
  imports: [TypeOrmModule.forFeature([Donator, User, Role, UserRole])],
  controllers: [DonatorsController],
  providers: [DonatorsService, DonatorsActions, EmailsService],
})
export class DonatorsModule {}
