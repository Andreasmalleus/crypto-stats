import { PrismaClient } from ".prisma/client";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../prisma/generated/type-graphql"
import { SignupInput } from "../utils/SignupInput";
import { signupOutput, validateSignup } from "../utils/validateSignup";
import argon from "argon2";
import { myContext } from "../types";
import validateUsername from "../utils/fieldValidations/validateUsername";
import validateEmail from "../utils/fieldValidations/validateEmail";


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

@InputType()
export class UserUpdateInput {
    @Field({nullable: true})
    username: string;

    @Field({nullable: true})
    email: string;
}

@Resolver(User)
export class UserResolver{

    @Mutation(() => UserResponse)
    async updateUsernameOrEmail(
        @Arg("options") options: UserUpdateInput,
        @Ctx() {prisma, req} : myContext
    ){
        const id = req.session.userId;

        if(!id){
            return {error : {
                field : "username",
                message : "You must be logged in to update your profile"
            }};
        }

        const {username, email} = options;

        let usernameValidation = null;
        let emailValidation = null;
        
        if(username){
            usernameValidation = validateUsername(username);
        }
        if(email){
            emailValidation = validateEmail(email);
        }

        if(usernameValidation || emailValidation){
            return usernameValidation || emailValidation;
        }

        //both fields are provided
        if(options.username && options.email){
            const user = await prisma.user.update({where : {id : id}, data : {
                username : options.username,
                email : options.email
            }})
            return {user};
        }
            
        // only one of username or email is provided
        const onlyUsername = username ? username : null;
        const user = await prisma.user.update({where : {id : id}, data : {
            [onlyUsername ? "username" : "email"] : onlyUsername ? username : email
        }})

        return {user};
        
    }

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

    @Query(() => User || null, {nullable : true})
    async me(
        @Ctx() {req, prisma} : myContext
    ){
        const {userId} = req.session;
        if(!userId){
            return null;
        }
        const user = await prisma.user.findUnique({
            where : {
                id: userId
            }
        })
        if(!user){
            return null
        }
        return user
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

    @Mutation(() => UserResponse)
    async login(
        @Arg("usernameOrEmail") usernameOrEmail: string,
        @Arg("password") password: string,
        @Ctx() {prisma, req} : myContext
    ){
        let isEmail = false;

        if(usernameOrEmail.includes("@")){
            isEmail = true;
        }

        const user : User = await prisma.user.findUnique({
            where : {
                [isEmail ? "email" : "username"] : usernameOrEmail,
            }
        })

        if(!user){
            return {
                error: {
                    field: "usernameOrEmail",
                    message: "User not found"
                }
            }
        }

        const valid = await argon.verify(user.password, password);

        if(!valid){
            return {
                error: {
                    field: "password",
                    message: "Invalid password"
                }
            };
        }

        req.session.userId = user.id;

        return {user};
    }
}