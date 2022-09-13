import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";


export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.user;
    }
);