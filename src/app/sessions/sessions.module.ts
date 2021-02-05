import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { SessionsService } from './sessions.service';
import { SessionsActions } from './sessions.actions';
import { SessionsController } from './sessions.controller';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';

const JwtModuleConfig = {
  secret: process.env.APP_SECRET,
  signOptions: { expiresIn: '1h' },
};

@Global()
@Module({
  imports: [UsersModule, PassportModule, JwtModule.register(JwtModuleConfig)],
  providers: [SessionsService, LocalStrategy, SessionsActions],
  controllers: [SessionsController],
  exports: [UsersModule, JwtModule.register(JwtModuleConfig)],
})
export class SessionsModule {}
