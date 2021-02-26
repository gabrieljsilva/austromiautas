import { Module } from '@nestjs/common';

import { ComorbitiesActions } from './comorbities.actions';
import { ComorbitiesController } from './comorbities.controllers';
import { ComorbitiesService } from './comorbities.service';

@Module({
  imports: [],
  controllers: [ComorbitiesController],
  providers: [ComorbitiesService, ComorbitiesActions],
  exports: [],
})
export class ComorbitiesModule {}
