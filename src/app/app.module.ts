import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';

import REDIS_CONFIG from '../shared/redis/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailsModule } from './emails/emails.module';
import { DonatorsModule } from './donators/donators.module';
import { AddressesModule } from './donators/addresses/addresses.module';

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
    AuthModule,
    EmailsModule,
    DonatorsModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
