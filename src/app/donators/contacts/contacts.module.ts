import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactsActions } from './contacts.actions';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { DonatorsModule } from '../donators.module';

import { Contact } from '../../../shared/database/entities/Contact';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), DonatorsModule],
  controllers: [ContactsController],
  providers: [ContactsService, ContactsActions],
  exports: [ContactsService],
})
export class ContactsModule {}
