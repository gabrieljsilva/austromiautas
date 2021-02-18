import { Controller, UseInterceptors, Body, Post, Get, Put, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Protect } from '../../auth/protect.decorator';
import { ValidationPipe } from '../../utils/validation.pipe';
import { DonatorInterceptor } from '../donator.interceptor';
import { Donator } from '../donator.decorator';

import { Donator as DonatorEntity } from '../../../shared/database/entities/Donator';
import { ContactsActions } from './contacts.actions';
import { CreateContactDTO } from './DTO/createContactDTO';
import { UpdateContactDTO } from './DTO/updateContact.DTO';

@ApiTags("Donator's Contacts")
@Protect()
@UseInterceptors(DonatorInterceptor)
@Controller('donators/contacts')
export class ContactsController {
  constructor(private readonly contactsActions: ContactsActions) {}

  @Post()
  async create(@Body(new ValidationPipe()) createContactDTO: CreateContactDTO, @Donator() donator: DonatorEntity) {
    return this.contactsActions.create(createContactDTO, donator);
  }

  @Get(':id')
  async show(@Param('id') contactId: string, @Donator() donator: DonatorEntity) {
    return this.contactsActions.show(contactId, donator);
  }

  @Get()
  async list(@Donator() donator: DonatorEntity) {
    return this.contactsActions.list(donator);
  }

  @Put(':id')
  async update(
    @Param('id') contactId: string,
    @Donator() donator: DonatorEntity,
    @Body(new ValidationPipe()) updateContactDTO: UpdateContactDTO,
  ) {
    return this.contactsActions.update(updateContactDTO, donator, contactId);
  }

  @Delete(':id')
  async delete(@Param('id') contactId: string, @Donator() donator: DonatorEntity) {
    return this.contactsActions.delete(donator, contactId);
  }
}
