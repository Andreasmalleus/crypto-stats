import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/user"
import { PrismaClient } from "@prisma/client";
import express from "express"
import session from "express-session"
import connectRedis from "connect-redis";
import Redis from "ioredis";


const prisma = new PrismaClient();

const main = async () => {

    const app = express();

    const redisStore = connectRedis(session);
    const redis = new Redis();
    
    app.use(session({
        name : "qid",
        store : new redisStore({
            client : redis,
            disableTTL : false,
            disableTouch : true
        }),
        cookie : {
            secure : false,
            httpOnly : true,
            maxAge : 1000 * 60 * 60 * 24 * 365 * 10,
            sameSite : 'lax'
        },
        secret : "MY SECRET" as string,
        saveUninitialized : false,
        resave : true

    }))

    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers : [UserResolver],
        }),
        context : ({req, res}) => ({prisma, req, res})
    });

    apolloServer.applyMiddleware({app, cors : {
        origin : "http://localhost:3000",
        credentials : true
    }})

    app.listen(4000, () => {
        console.log("server started on http://localhost:4000")
    });
}

main().catch(console.error);