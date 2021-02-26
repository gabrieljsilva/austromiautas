import { Injectable } from '@nestjs/common';

import { ComorbitiesService } from './comorbities.service';

@Injectable()
export class ComorbitiesActions {
  constructor(private readonly comorbitiesService: ComorbitiesService) {}
  addComorbities() {
    return;
  }

  removeComorbities() {
    return;
  }

  updateComorbities() {
    return;
  }
}
