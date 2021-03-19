import { Controller, Post, Get, Body, UseInterceptors, Query } from '@nestjs/common';
import { ApiTags, ApiSecurity, ApiQuery } from '@nestjs/swagger';

import { DonatorsActions } from './donators.actions';
import { CreateDonatorDTO } from './DTO/createDonatorDTO';
import { ValidateDonatorPipe } from './custom.validators.pipe';

import { AccessToken } from '../utils/access.token.decorator';
import { AccessToken as AccessTokenEntity } from '../../shared/database/entities/AccessToken';

import { Donator } from './donator.decorator';
import { DonatorInterceptor } from './donator.interceptor';
import { Donator as DonatorEntity } from '../../shared/database/entities/Donator';

import { User as UserEntity } from '../../shared/database/entities/User';
import { User } from '../utils/user.decorator';
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

  @Get()
  @UseInterceptors(DonatorInterceptor)
  async show(@Donator() donator: DonatorEntity, @User() user: UserEntity) {
    return this.donatorsActions.show(donator, user);
  }
}
