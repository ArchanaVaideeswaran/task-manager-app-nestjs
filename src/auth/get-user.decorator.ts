import { createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";


export const GetUser = createParamDecorator((data, req): User => {
    console.log(data,'\n****************************\n',req);
    return req.user;
})