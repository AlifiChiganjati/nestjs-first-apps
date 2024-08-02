import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const InjectUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    console.log('masuk Inject user');
    const req = ctx.switchToHttp().getRequest();
    req.body.user = { id: req.user.id };
    console.log(req.body);
    return req.body;
  },
);
