import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { AvatarActions } from './avatar.actions';
import { AvatarController } from './avatar.controller';
import { AvatarService } from './avatar.service';
import { DonatorsModule } from '../donators.module';

import { Donator } from '../../../shared/database/entities/Donator';

@Module({
  imports: [
    DonatorsModule,
    TypeOrmModule.forFeature([Donator]),
    MulterModule.register({
      dest: './uploads/images',
    }),
  ],
  providers: [AvatarActions, AvatarService],
  controllers: [AvatarController],
  exports: [],
})
export class AvatarModule {}
