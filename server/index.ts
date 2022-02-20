import "reflect-metadata"
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/user"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
    
    const server = new ApolloServer({
        schema : await buildSchema({
            resolvers : [UserResolver],
        }),
        context : () => ({prisma})
    })

    server.listen().then(({ url }) => {
        console.log(`Server is running on ${url}`)
    })
}

main().catch(console.error);