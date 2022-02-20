import { PrismaClient } from ".prisma/client";
import { Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../prisma/generated/type-graphql"
import { SignupInput } from "../utils/SignupInput";
import { validateSignup } from "../utils/validateSignup";
import argon from "argon2";


@ObjectType()
class FieldError{
    @Field(() => String)
    field?: string;

    @Field(() => String)
    message?: string;
}

@ObjectType()
class UserResponse{
    @Field(() => User, {nullable: true})
    user?: User;

    @Field(() => FieldError, {nullable: true})
    error?: FieldError;
}

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

    @Mutation(() => UserResponse)
    async signup(
        @Arg("options") options: SignupInput,
        @Ctx() {prisma} : {prisma: PrismaClient}
    ){
        const error = validateSignup(options);

        if(error){
            return error;
        }

        const {username, email, password} = options;

        const hash = await argon.hash(password);

        let user : User = null;

        try{
            user = await prisma.user.create({
                data : {
                    username,
                    email,
                    password : hash
                }
            })
        }catch(e){
            console.log(e.code)
            if(e.code == 'P2002'){
                return {
                    error : {
                        field : "email",
                        message : "email already exists"
                    }
                }
            }
            return {
                error : {
                    field : "password",
                    message : "Unexpected error",
                } 
            } 
        }
        return {
            user
        };
    }
}