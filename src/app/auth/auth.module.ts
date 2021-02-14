import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthActions } from './auth.actions';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';

import { AccessToken } from '../../shared/database/entities/AccessToken';

const JwtModuleConfig = {
  secret: process.env.APP_SECRET,
  signOptions: { expiresIn: '1h' },
};

@Global()
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(JwtModuleConfig), TypeOrmModule.forFeature([AccessToken])],
  providers: [AuthService, LocalStrategy, AuthActions],
  controllers: [AuthController],
  exports: [UsersModule, AuthService, JwtModule.register(JwtModuleConfig)],
})
export class AuthModule {}
