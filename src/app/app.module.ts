import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import REDIS_CONFIG from '../shared/redis/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { EmailsModule } from './emails/emails.module';

import { User } from 'src/shared/database/entities/User';
import { Role } from '../shared/database/entities/Role';
import { UserRole } from '../shared/database/entities/UserRole';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User, Role, UserRole]),
    BullModule.forRoot({
      redis: REDIS_CONFIG,
    }),
    UsersModule,
    SessionsModule,
    EmailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
