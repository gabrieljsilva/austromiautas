import { Controller, Post, Get, Body } from '@nestjs/common';
import { ApiTags, ApiSecurity } from '@nestjs/swagger';

import { DonatorsActions } from './donators.actions';
import { CreateDonatorDTO } from './DTO/createDonatorDTO';
import { ValidateDonatorPipe } from './custom.validators.pipe';

import { AccessToken } from '../utils/access.token.decorator';
import { AccessToken as AccessTokenEntity } from '../../shared/database/entities/AccessToken';

import { Protect } from '../auth/protect.decorator';

@ApiTags('donators')
@ApiSecurity('basic')
@Protect()
@Controller('donators')
export class DonatorsController {
  constructor(private readonly donatorsActions: DonatorsActions) {}

  @Post()
  async create(
    @Body(new ValidateDonatorPipe()) createDonatorDTO: CreateDonatorDTO,
    @AccessToken() accessToken: AccessTokenEntity,
  ) {
    return await this.donatorsActions.create(createDonatorDTO, accessToken.host, accessToken.protocol);
  }

  @Get()
  async list() {
    return this.donatorsActions.list();
  }
}
