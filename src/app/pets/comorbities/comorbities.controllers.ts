import { Controller } from '@nestjs/common';
import { ApiTags, ApiSecurity, ApiBearerAuth } from '@nestjs/swagger';

import { ComorbitiesActions } from './comorbities.actions';

@ApiTags('pets comorbities')
@ApiSecurity('basic')
@ApiBearerAuth()
@Controller('/pets/:id/comorbities')
export class ComorbitiesController {
  constructor(private readonly comorbitiesActions: ComorbitiesActions) {}
}
