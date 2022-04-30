import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Favorite } from "../prisma/generated/type-graphql";
import { myContext } from "../types";

@Resolver(Favorite)
export class FavoriteResolver {

  @Query(() => [Favorite])
  async favorites(
    @Arg("category", () => String) category: string,
    @Ctx() { prisma, req } : myContext
  ){
    const {userId} = req.session;
    const favorites = prisma.favorite.findMany({
      where : {
        userId : userId,
        category : category
      }
    })
    return favorites;
  }
}