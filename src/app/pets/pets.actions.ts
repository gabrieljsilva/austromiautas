import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { PetsService } from './pets.service';
import { ContactsService } from '../donators/contacts/contacts.service';

import { CreatePetDTO } from './DTO/createPet.dto';
import { UpdatePetDTO } from './DTO/updatePet.dto';
import { AdoptPetDTO } from './DTO/adoptPet.dto';

import { Donator } from '../../shared/database/entities/Donator';

import { ADOPTION_STATUS } from '../../shared/enums/ADOPTION_STATUS';
import { CONTACTS } from '../../shared/enums/CONTACTS';

@Injectable()
export class PetsActions {
  constructor(private readonly petsService: PetsService, private readonly contactsService: ContactsService) {}

  async list(donator?: Donator) {
    if (donator) {
      return this.petsService.listDonatorPets(donator.id);
    }
    return this.petsService.listRandom();
  }

  async show(petId: string) {
    return this.petsService.findById(petId);
  }

  async create(createPetDTO: CreatePetDTO, donator: Donator) {
    const donatorWhatsappContactsCount = await this.contactsService.countDonatorContactsByType(
      donator.id,
      CONTACTS.whatsapp,
    );

    if (donatorWhatsappContactsCount < 1) {
      throw new BadRequestException('register a whatsapp contact before registering pets');
    }

    const pet = await this.petsService.store(createPetDTO, donator.id);
    delete pet.donatorId;
    return pet;
  }

  async update(updatePetDTO: UpdatePetDTO, donator: Donator, petId: string) {
    const petNotExists = !(await this.petsService.checkIfDonatorPetExists(petId, donator.id));

    if (petNotExists) {
      throw new NotFoundException('pet not found');
    }

    for (const [key, value] of Object.entries(updatePetDTO)) {
      if (value === undefined) {
        delete updatePetDTO[key];
      }
    }

    const pet = await this.petsService.update(updatePetDTO, petId);
    delete pet.donatorId;
    return pet;
  }

  async delete(petId: string, donator: Donator) {
    const pet = await this.petsService.findDonatorPet(petId, donator.id);

    const petNotExists = !pet;

    if (petNotExists) {
      throw new NotFoundException('pet not found');
    }

    if (pet.adoptionStatus !== ADOPTION_STATUS.waiting) {
      throw new BadRequestException('pet can only be deleted when the status is "waiting"');
    }

    await this.petsService.delete(petId);
    delete pet.donatorId;
    return pet;
  }

  async confirmAdoption(petId: string, donator: Donator) {
    const petNotExists = !(await this.petsService.checkIfDonatorPetExists(petId, donator.id));

    if (petNotExists) {
      throw new NotFoundException('pet not found');
    }

    const petIsNotInProgresss = !(await this.petsService.checkIfDonatorPetIsInProgress(petId, donator.id));

    if (petIsNotInProgresss) {
      throw new BadRequestException('the adoption process has not started or pet has already been adopted');
    }

    const pet = await this.petsService.confirmAdoption(petId);
    delete pet.donatorId;

    return pet;
  }

  async adopt(adoptPetDTO: AdoptPetDTO, petId: string) {
    const petNotExists = !(await this.petsService.checkIfPetExists(petId));

    if (petNotExists) {
      throw new NotFoundException('pet not found');
    }

    const petIsNotWaiting = !(await this.petsService.checkIfPetIsWaiting(petId));

    if (petIsNotWaiting) {
      throw new BadRequestException('pet already had the adoption process started');
    }

    await this.petsService.adopt(adoptPetDTO, petId);
    const pet = await this.petsService.findById(petId);
    return pet;
  }
}
