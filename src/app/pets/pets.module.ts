import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DonatorsModule } from '../donators/donators.module';
import { ContactsModule } from '../donators/contacts/contacts.module';

import { PetsActions } from './pets.actions';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';

import { Pet } from '../../shared/database/entities/Pet';

@Module({
  imports: [TypeOrmModule.forFeature([Pet]), DonatorsModule, ContactsModule],
  providers: [PetsService, PetsActions],
  controllers: [PetsController],
  exports: [PetsService],
})
export class PetsModule {}
