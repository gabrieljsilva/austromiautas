import { Controller } from '@nestjs/common';

import { ComorbitiesActions } from './comorbities.actions';

@Controller('/pets/:id/comorbities')
export class ComorbitiesController {
  constructor(private readonly comorbitiesActions: ComorbitiesActions) {}
}
