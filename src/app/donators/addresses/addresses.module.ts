import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressesActions } from './addresses.actions';
import { AddressesController } from './addresses.controllers';
import { AddressesService } from './addresses.service';

import { Address } from '../../../shared/database/entities/Address';

import { DonatorsModule } from '../donators.module';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), DonatorsModule],
  controllers: [AddressesController],
  providers: [AddressesActions, AddressesService],
})
export class AddressesModule {}
