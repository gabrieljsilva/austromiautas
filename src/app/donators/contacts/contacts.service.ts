import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CONTACTS } from '../../../shared/enums/CONTACTS';

import { Contact } from '../../../shared/database/entities/Contact';

import { CreateContactDTO } from './DTO/createContactDTO';
import { UpdateContactDTO } from './DTO/updateContact.DTO';

@Injectable()
export class ContactsService {
  constructor(@InjectRepository(Contact) private readonly contactRepository: Repository<Contact>) {}

  async store(createContactDTO: CreateContactDTO, donatorId: string) {
    const contact = this.contactRepository.create({ ...createContactDTO, donatorId });
    await this.contactRepository.save(contact);
    return contact;
  }

  async update(contact: Contact, updateContactDTO: UpdateContactDTO) {
    await this.contactRepository.update(contact.id, updateContactDTO);
    return this.contactRepository.findOne({
      where: { id: contact.id },
      select: ['id', 'type', 'contact', 'createdAt', 'updatedAt'],
    });
  }

  async delete(contact: Contact) {
    await this.contactRepository.delete(contact.id);
    return contact;
  }

  async findDonatorContactById(contactId: string, donatorId: string) {
    return await this.contactRepository.findOne({
      where: { id: contactId, donatorId },
      select: ['id', 'type', 'contact', 'createdAt', 'updatedAt'],
    });
  }

  async findDonatorContacts(donatorId: string) {
    return await this.contactRepository.find({
      where: { donatorId },
      select: ['id', 'type', 'contact', 'createdAt', 'updatedAt'],
    });
  }

  async countDonatorContactsByType(donatorId: string, contactType: CONTACTS) {
    return this.contactRepository.count({ where: { donatorId: donatorId, type: contactType } });
  }

  async checkIfDonatorContactExistsById(contactId: string, donatorId: string) {
    return (
      (await this.contactRepository.count({
        where: { id: contactId, donatorId },
      })) > 0
    );
  }
}
