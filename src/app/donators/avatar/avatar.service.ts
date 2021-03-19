import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { Donator } from '../../../shared/database/entities/Donator';

@Injectable()
export class AvatarService {
  constructor(@InjectRepository(Donator) private readonly donatorRepository: Repository<Donator>) {}

  async setAvatar(donatorId: string, avatarPath: string) {
    const donator = await this.donatorRepository.findOne({ where: { id: donatorId } });
    donator.avatar = avatarPath;
    await this.donatorRepository.save(donator);
    return donator;
  }

  async deleteFromDatabase(donatorId: string) {
    const donator = await this.donatorRepository.findOne({ where: { id: donatorId } });
    donator.avatar = null;
    await this.donatorRepository.save(donator);
    return donator;
  }

  async deleteFromDiskStorage(filename: string) {
    if (filename) {
      return new Promise((resolve, reject) => {
        fs.unlink(path.resolve(__dirname, '../../../..', 'uploads', 'images', filename), (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              return resolve(filename);
            }
            return reject(err.code);
          }
          return resolve(filename);
        });
      });
    }
  }
}
