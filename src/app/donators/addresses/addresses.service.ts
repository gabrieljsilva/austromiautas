import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Address } from '../../../shared/database/entities/Address';
import { CreateAddressDTO } from './DTO/createAddress.dto';
import { UpdateAddressDTO } from './DTO/updateAddress.dto';

@Injectable()
export class AddressesService {
  constructor(@InjectRepository(Address) private readonly addressRepository: Repository<Address>) {}

  async store(createAddressDTO: CreateAddressDTO, donatorId: string) {
    const address = this.addressRepository.create({ ...createAddressDTO, donatorId });
    await this.addressRepository.save(address);
    return address;
  }

  async delete(address: Address) {
    return this.addressRepository.remove(address);
  }

  async update(updateAddressDTO: UpdateAddressDTO, donatorId: string) {
    const address = await this.addressRepository.findOne({ where: { donatorId } });

    await this.addressRepository.update(address.id, updateAddressDTO);
    return await this.addressRepository.findOne(address.id);
  }

  async checkIfDonatorAlreadyHasAnAddress(donatorId: string) {
    return (await this.addressRepository.count({ where: { donatorId } })) > 0;
  }

  async findAddressByDonatorId(donatorId: string) {
    return this.addressRepository.findOne({
      where: { donatorId },
      select: [
        'id',
        'street',
        'number',
        'neighborhood',
        'city',
        'state',
        'latitude',
        'longitude',
        'createdAt',
        'updatedAt',
      ],
    });
  }
}
