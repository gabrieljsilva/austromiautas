import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Donator = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.donator;
});
