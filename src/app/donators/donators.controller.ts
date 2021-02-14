import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { DonatorsActions } from './donators.actions';
import { CreateDonatorDTO } from './DTO/createDonatorDTO';
import { ValidateDonatorPipe } from './custom.validators.pipe';

import { Protect } from '../auth/protect.decorator';

@ApiTags('donators')
@Protect()
@Controller('donators')
export class DonatorsController {
  constructor(private readonly donatorsActions: DonatorsActions) {}

  @Post()
  async create(@Body(new ValidateDonatorPipe()) createDonatorDTO: CreateDonatorDTO) {
    return await this.donatorsActions.create(createDonatorDTO);
  }

  @Get()
  async list() {
    return this.donatorsActions.list();
  }
}
