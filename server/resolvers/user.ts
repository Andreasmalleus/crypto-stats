import { PrismaClient } from ".prisma/client";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { User } from "../prisma/generated/type-graphql"

@Resolver(User)
export class UserResolver{

    @Query(() => User || null, {nullable: true})
    async user(
        @Arg("id") id: number,
        @Ctx() {prisma} : {prisma: PrismaClient}
    ){
        if(!id){
            return null;
        }

        const user : User = await prisma.user.findUnique({
            where : {
                id: id,
            }
        })
        if(!user){
            return null;
        }

        return user;
    }
}