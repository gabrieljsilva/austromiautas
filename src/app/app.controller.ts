import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

import { Protect } from './auth/protect.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Protect()
  @Get()
  hello(@Req() req: Request) {
    return 'hello world';
  }
}
