import { Injectable, NotFoundException } from '@nestjs/common';

import { ContactsService } from './contacts.service';
import { Donator } from '../../../shared/database/entities/Donator';

import { CreateContactDTO } from './DTO/createContactDTO';
import { UpdateContactDTO } from './DTO/updateContact.DTO';

@Injectable()
export class ContactsActions {
  constructor(private readonly contactsService: ContactsService) {}

  async create(createContactDTO: CreateContactDTO, donator: Donator) {
    return this.contactsService.store(createContactDTO, donator.id);
  }

  async show(contactId: string, donator: Donator) {
    const contactNotExists = !(await this.contactsService.findDonatorContactById(contactId, donator.id));

    if (contactNotExists) {
      throw new NotFoundException('contact not found');
    }

    return this.contactsService.findDonatorContactById(contactId, donator.id);
  }

  async list(donator: Donator) {
    const contacts = await this.contactsService.findDonatorContacts(donator.id);
    return contacts;
  }

  async update(updateContactDTO: UpdateContactDTO, donator: Donator, contactId: string) {
    const contactNotExists = !(await this.contactsService.findDonatorContactById(contactId, donator.id));

    if (contactNotExists) {
      throw new NotFoundException('contact not found');
    }

    for (const [key, value] of Object.entries(updateContactDTO)) {
      if (value === undefined) {
        delete updateContactDTO[key];
      }
    }

    const contact = await this.contactsService.findDonatorContactById(contactId, donator.id);

    return this.contactsService.update(contact, updateContactDTO);
  }

  async delete(donator: Donator, contactId: string) {
    const contactNotExists = !(await this.contactsService.findDonatorContactById(contactId, donator.id));

    if (contactNotExists) {
      throw new NotFoundException('contact not found');
    }

    const contact = await this.contactsService.findDonatorContactById(contactId, donator.id);
    return await this.contactsService.delete(contact);
  }
}
