import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

import { AddressesService } from './addresses.service';
import { DonatorsService } from '../donators.service';

import { User } from '../../../shared/database/entities/User';

import { CreateAddressDTO } from './DTO/createAddress.dto';
import { UpdateAddressDTO } from './DTO/updateAddress.dto';
import { Donator } from 'src/shared/database/entities/Donator';

@Injectable()
export class AddressesActions {
  constructor(private readonly addressesService: AddressesService, private readonly donatorsService: DonatorsService) {}

  async show(donator: Donator) {
    const donatorAlreadyHasAnAddress = await this.addressesService.checkIfDonatorAlreadyHasAnAddress(donator.id);

    if (!donatorAlreadyHasAnAddress) {
      throw new NotFoundException('address not found');
    }

    return this.addressesService.findAddressByDonatorId(donator.id);
  }

  async create(createAddressDTO: CreateAddressDTO, donator: Donator) {
    const donatorAlreadyHasAnAddress = await this.addressesService.checkIfDonatorAlreadyHasAnAddress(donator.id);
    if (donatorAlreadyHasAnAddress) {
      throw new ConflictException('user already has an address');
    }

    const address = await this.addressesService.store(createAddressDTO, donator.id);
    return address;
  }

  async update(updateAddressDTO: UpdateAddressDTO, donator: Donator) {
    const donatorAlreadyHasAnAddress = await this.addressesService.checkIfDonatorAlreadyHasAnAddress(donator.id);
    if (!donatorAlreadyHasAnAddress) {
      throw new NotFoundException('address not found');
    }

    for (const [key, value] of Object.entries(updateAddressDTO)) {
      if (value === undefined) {
        delete updateAddressDTO[key];
      }
    }

    if (updateAddressDTO.latitude === null || updateAddressDTO.longitude === null) {
      updateAddressDTO.latitude = null;
      updateAddressDTO.longitude = null;
    }

    const address = await this.addressesService.update(updateAddressDTO, donator.id);
    return address;
  }

  async delete(donator: Donator) {
    const donatorAlreadyHasAnAddress = await this.addressesService.findAddressByDonatorId(donator.id);
    if (!donatorAlreadyHasAnAddress) {
      throw new NotFoundException('address not found');
    }
    const address = await this.addressesService.findAddressByDonatorId(donator.id);
    return this.addressesService.delete(address);
  }
}
