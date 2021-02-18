import { Controller, Get, Post, Put, Delete, Body, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Protect } from '../../auth/protect.decorator';
import { ValidationPipe } from '../../utils/validation.pipe';
import { Donator } from '../donator.decorator';
import { DonatorInterceptor } from '../donator.interceptor';
import { Donator as DonatorEntity } from '../../../shared/database/entities/Donator';

import { AddressesActions } from './addresses.actions';
import { CreateAddressDTO } from './DTO/createAddress.dto';
import { UpdateAddressDTO } from './DTO/updateAddress.dto';

@ApiTags("donator's addresses")
@Protect()
@UseInterceptors(DonatorInterceptor)
@Controller('donators/addresses')
export class AddressesController {
  constructor(private readonly addressesActions: AddressesActions) {}

  @Get()
  async show(@Donator() donator: DonatorEntity) {
    return this.addressesActions.show(donator);
  }

  @Post()
  async create(@Body(new ValidationPipe()) createAddressDTO: CreateAddressDTO, @Donator() donator: DonatorEntity) {
    return this.addressesActions.create(createAddressDTO, donator);
  }

  @Put()
  async update(@Body(new ValidationPipe()) updateAddressDTO: UpdateAddressDTO, @Donator() donator: DonatorEntity) {
    return this.addressesActions.update(updateAddressDTO, donator);
  }

  @Delete()
  async delete(@Donator() donator: DonatorEntity) {
    return this.addressesActions.delete(donator);
  }
}
