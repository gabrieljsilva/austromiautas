import { Controller, Post, Get, Body, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags, ApiSecurity, ApiQuery } from '@nestjs/swagger';

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
    return await this.donatorsActions.create(createDonatorDTO, accessToken);
  }

  @ApiQuery({ name: 'page', required: false, schema: { type: 'integer' } })
  @ApiQuery({ name: 'limit', required: false, schema: { type: 'integer' } })
  @Get()
  async listNgos(@Query('page', ParseIntPipe) page = 0, @Query('limit') limit = 10) {
    return this.donatorsActions.listNgos(page, limit);
  }
}
