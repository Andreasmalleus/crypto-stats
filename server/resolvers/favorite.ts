import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import { Favorite } from "../prisma/generated/type-graphql";
import { myContext } from "../types";

@Resolver(Favorite)
export class FavoriteResolver {
  @Mutation(() => Favorite || null, { nullable: true })
  async favorite(
    @Arg("cryptoId", () => Int) cryptoId: number,
    @Arg("category") category: string,
    @Ctx() { prisma, req }: myContext
  ) {
    const { userId } = req.session;

    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
      },
    });
    //check if favorites already exists
    const exists = favorites.find((favorite) => favorite.cryptoId === cryptoId);
    if (exists) {
      return null;
    }
    let favorite = null;
    try {
      favorite = await prisma.favorite.create({
        data: {
          cryptoId,
          userId: userId,
          category: category,
        },
      });
    } catch (e) {
      console.log(e);
      return null;
    }
    return favorite;
  }

  @Mutation(() => Boolean)
  async unfavorite(
    @Arg("cryptoId", () => Int) cryptoId: number,
    @Arg("category", () => String) category: string,
    @Ctx() { prisma, req }: myContext
  ) {
    const { userId } = req.session;
    const favorite = await prisma.favorite.deleteMany({
      where: {
        cryptoId,
        userId: userId,
        category: category,
      },
    });
    if (favorite) {
      return true;
    }
    return false;
  }

  @Query(() => [Favorite])
  async favorites(
    @Arg("category", () => String) category: string,
    @Ctx() { prisma, req }: myContext
  ) {
    const { userId } = req.session;
    const favorites = prisma.favorite.findMany({
      where: {
        userId: userId,
        category: category,
      },
    });
    return favorites;
  }
}
