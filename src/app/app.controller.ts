import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiSecurity } from '@nestjs/swagger';

import { Protect } from './auth/protect.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiSecurity('basic')
  @Protect()
  @Get()
  hello() {
    return { message: 'Austromiautas', version: '1.0.0' };
  }
}
