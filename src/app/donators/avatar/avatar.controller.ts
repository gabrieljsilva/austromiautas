import { Controller, Post, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { Protect } from '../../auth/protect.decorator';
import { avatarStorage } from './avatar.disk.storage';

import { AvatarActions } from './avatar.actions';

import { DonatorInterceptor } from '../donator.interceptor';
import { Donator } from '../donator.decorator';
import { Donator as DonatorEntity } from '../../../shared/database/entities/Donator';

@ApiTags("Donator's avatar")
@Protect()
@Controller('/donators/avatar')
export class AvatarController {
  constructor(private readonly avatarActions: AvatarActions) {}
  @Post()
  @UseInterceptors(FileInterceptor('avatar', { storage: avatarStorage }))
  @UseInterceptors(DonatorInterceptor)
  upload(@UploadedFile() avatar: Express.Multer.File, @Donator() donator: DonatorEntity) {
    return this.avatarActions.upload(avatar, donator);
  }

  @Delete()
  @UseInterceptors(DonatorInterceptor)
  delete(@Donator() donator: DonatorEntity) {
    return this.avatarActions.delete(donator);
  }
}
