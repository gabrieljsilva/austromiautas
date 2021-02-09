import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DonatorsActions } from './donators.actions';
import { CreateDonatorDTO } from './DTO/createDonatorDTO';
import { ValidateDonatorPipe } from './custom.validators.pipe';

import { Protect } from '../auth/protect.decorator';

@ApiTags('donators')
@Controller('donators')
export class DonatorsController {
  constructor(private readonly donatorsActions: DonatorsActions) {}

  @Protect('donators')
  @Post()
  async create(@Body(new ValidateDonatorPipe()) createDonatorDTO: CreateDonatorDTO) {
    return await this.donatorsActions.create(createDonatorDTO);
  }

  @Get()
  async list() {
    return await this.donatorsActions.list();
  }
}
