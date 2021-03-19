import { Injectable } from '@nestjs/common';

import { AvatarService } from './avatar.service';
import { Donator } from '../../../shared/database/entities/Donator';

@Injectable()
export class AvatarActions {
  constructor(private readonly avatarService: AvatarService) {}

  async upload(avatar: Express.Multer.File, donator: Donator) {
    await this.avatarService.setAvatar(donator.id, avatar.filename);
    return { path: `/static/images/${avatar.filename}` };
  }

  async delete(donator: Donator) {
    await this.avatarService.deleteFromDatabase(donator.id);
    return this.avatarService.deleteFromDiskStorage(donator.avatar);
  }
}
