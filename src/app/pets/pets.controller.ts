import { Controller, Body, UseInterceptors, Param, Get, Post, Delete, Put } from '@nestjs/common';
import { PetsActions } from './pets.actions';

import { ValidationPipe } from '../utils/validation.pipe';
import { Protect } from '../auth/protect.decorator';
import { Donator } from '../donators/donator.decorator';
import { DonatorInterceptor } from '../donators/donator.interceptor';

import { CreatePetDTO } from './DTO/createPet.dto';
import { UpdatePetDTO } from './DTO/updatePet.dto';
import { AdoptPetDTO } from './DTO/adoptPet.dto';

import { Donator as DonatorEntity } from '../../shared/database/entities/Donator';

@Protect()
@Controller('pets')
export class PetsController {
  constructor(private readonly petsActions: PetsActions) {}
  @Post()
  @UseInterceptors(DonatorInterceptor)
  async create(@Body(new ValidationPipe()) createPetDTO: CreatePetDTO, @Donator() donator: DonatorEntity) {
    return this.petsActions.create(createPetDTO, donator);
  }

  @Get()
  @UseInterceptors(DonatorInterceptor)
  async list(@Donator() donator: DonatorEntity) {
    return this.petsActions.list(donator);
  }

  @Delete('/:id')
  @UseInterceptors(DonatorInterceptor)
  async delete(@Param('id') petId: string, @Donator() donator: DonatorEntity) {
    return this.petsActions.delete(petId, donator);
  }

  @Put('/:id')
  @UseInterceptors(DonatorInterceptor)
  async update(
    @Param('id') petId: string,
    @Donator() donator: DonatorEntity,
    @Body(new ValidationPipe()) updatePetDTO: UpdatePetDTO,
  ) {
    return this.petsActions.update(updatePetDTO, donator, petId);
  }

  @Put('/:id/adopt/confirm')
  @UseInterceptors(DonatorInterceptor)
  async confirmAdoption(@Param('id') petId: string, @Donator() donator: DonatorEntity) {
    return this.petsActions.confirmAdoption(petId, donator);
  }

  @Post('/:id/adopt')
  async adopt(@Param('id') petId: string, @Body(new ValidationPipe()) adoptPetDTO: AdoptPetDTO) {
    return this.petsActions.adopt(adoptPetDTO, petId);
  }

  @Get('/:id')
  async show(@Param('id') petId: string) {
    return this.petsActions.show(petId);
  }
}
