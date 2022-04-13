import { PrismaClient } from "@prisma/client"
import {Session} from "express-session"

export type myContext = {
  req : Express.Request  & {
      session : Session
  },
  res : Express.Response & {
    clearCookie : Function
  },
  prisma : PrismaClient
}