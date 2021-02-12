import { Module } from '@nestjs/common';

import { AddressesActions } from './addresses.actions';
import { AddressesController } from './addresses.controllers';

@Module({
  controllers: [AddressesController],
  providers: [AddressesActions],
})
export class AddressesModule {}
