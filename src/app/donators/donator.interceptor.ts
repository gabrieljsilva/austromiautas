import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { DonatorsService } from './donators.service';
import { User } from '../../shared/database/entities/User';

@Injectable()
export class DonatorInterceptor implements NestInterceptor {
  constructor(private readonly donatorService: DonatorsService) {}

  async intercept(context: ExecutionContext, Next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (user) {
      const donator = await this.donatorService.findDonatorByUserId(user.id);
      request.donator = donator;
    }
    return Next.handle();
  }
}
