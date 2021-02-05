import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

import { Protect } from './sessions/protect.decorator';

@ApiTags('index')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Protect('index')
  @Get()
  index() {
    return { hello: 'World' };
  }
}
