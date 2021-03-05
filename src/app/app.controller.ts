import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiSecurity } from '@nestjs/swagger';
import * as version from '../../version.js';

import { Protect } from './auth/protect.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiSecurity('basic')
  @Protect()
  @Get()
  hello() {
    return { message: 'Austromiautas', version };
  }
}
