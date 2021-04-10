import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { Pet } from '../../shared/database/entities/Pet';

import { CreatePetDTO } from './DTO/createPet.dto';
import { UpdatePetDTO } from './DTO/updatePet.dto';
import { AdoptPetDTO } from './DTO/adoptPet.dto';

import { ADOPTION_STATUS } from '../../shared/enums/ADOPTION_STATUS';

@Injectable()
export class PetsService {
  constructor(@InjectRepository(Pet) private readonly petRepository: Repository<Pet>) {}

  async store(createPetDTO: CreatePetDTO, donatorId: string) {
    const pet = this.petRepository.create({ ...createPetDTO, donatorId, adoptionStatus: ADOPTION_STATUS.waiting });
    await this.petRepository.save(pet);
    return pet;
  }

  async listRandom() {
    const qb = this.petRepository.createQueryBuilder('pet');

    const pets = await qb
      .select([
        'pet.id',
        'pet.name',
        'pet.type',
        'pet.gender',
        'pet.isCastrated',
        'pet.isVaccinated',
        'pet.approximatedAge',
        'pet.adoptionReason',
        'pet.extraInformations',
        'pet.adopterName',
        'pet.adopterCPF',
        'pet.adopterBirth',
        'pet.adoptionStatus',
        'pet.avatar',
        'pet.createdAt',
        'pet.updatedAt',
      ])
      .orderBy('RANDOM()')
      .getMany();

    return pets;
  }

  async listDonatorPets(donatorId: string) {
    return this.petRepository.find({
      where: { donatorId },
      select: [
        'id',
        'name',
        'type',
        'gender',
        'isCastrated',
        'isVaccinated',
        'approximatedAge',
        'adoptionReason',
        'extraInformations',
        'adopterName',
        'adopterCPF',
        'adopterBirth',
        'adoptionStatus',
        'avatar',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findDonatorPet(petId: string, donatorId: string) {
    return this.petRepository.findOne({ id: petId, donatorId });
  }

  async checkIfDonatorPetExists(petId: string, donatorId: string) {
    return (await this.petRepository.count({ where: { id: petId, donatorId } })) > 0;
  }

  async checkIfPetExists(petId: string) {
    return (await this.petRepository.count({ where: { id: petId } })) > 0;
  }

  async checkIfPetIsWaiting(petId: string) {
    return (await this.petRepository.count({ where: { id: petId, adoptionStatus: ADOPTION_STATUS.waiting } })) > 0;
  }

  async checkIfDonatorPetIsInProgress(petId: string, donatorId: string) {
    return (
      (await this.petRepository.count({
        where: { id: petId, adoptionStatus: ADOPTION_STATUS.in_progress, donatorId },
      })) > 0
    );
  }

  async findById(petId: string) {
    const qb = this.petRepository.createQueryBuilder('pet');

    const pet = await qb
      .leftJoinAndSelect('pet.donator', 'donator')
      .select([
        'pet.id',
        'pet.name',
        'pet.type',
        'pet.gender',
        'pet.isCastrated',
        'pet.isVaccinated',
        'pet.approximatedAge',
        'pet.adoptionReason',
        'pet.extraInformations',
        'pet.adopterName',
        'pet.adopterCPF',
        'pet.adopterBirth',
        'pet.adoptionStatus',
        'pet.createdAt',
        'pet.updatedAt',
        'pet.avatar',
        'donator.id',
        'donator.name',
        'donator.createdAt',
      ])
      .where('pet.id = :pet', { pet: petId })
      .getOne();

    return pet;
  }

  async delete(petId: string) {
    const pet = await this.petRepository.findOne({ where: { id: petId } });
    await this.petRepository.remove(pet);
    return pet;
  }

  async update(updatePetDTO: UpdatePetDTO, petId: string) {
    await this.petRepository.update({ id: petId }, updatePetDTO);
    return this.petRepository.findOne(petId);
  }

  async adopt(adoptPetDTO: AdoptPetDTO, petId: string) {
    return this.petRepository.update({ id: petId }, { ...adoptPetDTO, adoptionStatus: ADOPTION_STATUS.in_progress });
  }

  async confirmAdoption(petId: string) {
    await this.petRepository.update({ id: petId }, { adoptionStatus: ADOPTION_STATUS.adopted });
    return this.petRepository.findOne({ where: { id: petId } });
  }

  async rejectAdoption(petId: string) {
    await this.petRepository.update(
      { id: petId },
      { adoptionStatus: ADOPTION_STATUS.waiting, adopterName: '', adopterBirth: '', adopterCPF: '' },
    );
    return this.petRepository.findOne({ where: { id: petId } });
  }

  async setAvatar(pet: Pet, avatar: Express.Multer.File) {
    pet.avatar = avatar?.filename || null;
    await this.petRepository.save(pet);
    return pet;
  }

  async deleteAvatarFromDiskStorage(filename: string) {
    if (filename) {
      return new Promise((resolve, reject) => {
        fs.unlink(path.resolve(__dirname, '../../..', 'uploads', 'images', filename), (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              return resolve(filename);
            }
            return reject(err.code);
          }
          return resolve({ filename });
        });
      });
    }
    return { filename };
  }

  async findPetOwner(petId: string) {
    return this.petRepository.findOne({ where: { id: petId }, relations: ['donator'] });
  }
}
