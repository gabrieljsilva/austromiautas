import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DonatorsController } from './donators.controller';
import { DonatorsService } from './donators.service';
import { DonatorsActions } from './donators.actions';
import { EmailsService } from '../emails/emails.service';

import { Donator } from '../../shared/database/entities/Donator';
import { User } from '../../shared/database/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Donator, User])],
  controllers: [DonatorsController],
  providers: [DonatorsService, DonatorsActions, EmailsService],
})
export class DonatorsModule {}
