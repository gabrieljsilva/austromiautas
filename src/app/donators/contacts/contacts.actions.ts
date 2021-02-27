import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { CONTACTS } from '../../../shared/enums/CONTACTS';

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

    const donatorWhatsappContactsCount = await this.contactsService.countDonatorContactsByType(
      donator.id,
      CONTACTS.whatsapp,
    );

    if (donatorWhatsappContactsCount <= 1) {
      if (updateContactDTO.type !== CONTACTS.whatsapp) {
        if (updateContactDTO.type !== undefined) {
          throw new BadRequestException('you must keep at least 1 whatsapp contact');
        }
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

    const donatorWhatsappContactsCount = await this.contactsService.countDonatorContactsByType(
      donator.id,
      CONTACTS.whatsapp,
    );

    const contact = await this.contactsService.findDonatorContactById(contactId, donator.id);

    if (donatorWhatsappContactsCount <= 1 && contact.type === CONTACTS.whatsapp) {
      throw new BadRequestException('you must keep at least 1 whatsapp contact');
    }

    return await this.contactsService.delete(contact);
  }
}
