import { ApolloCache, MutationFunction} from "@apollo/client";
import { FAVORITES_QUERY } from "../graphql/queries";
import { Favorite } from "../types";

const category = "crypto";

export const handleRemoveFromWatchlist = async(id: number, removeFromWishlist : MutationFunction) => {
  const variables = {
    id,
    category
  }
  const response = await removeFromWishlist({
    variables,
    update(cache) {
      const normalizedId = cache.identify({ id, __typename: "Favorite" });
      cache.evict({ id: normalizedId });
      cache.gc();
    },
  });
  return response;
}

export const handleAddToWatchlist = async (id: number, favorites: Favorite[], addToWishlist: MutationFunction, cache: ApolloCache<Object>) => {
  const variables = {
    id,
    category
  }
  const response = await addToWishlist({
    variables,
  });
  cache.writeQuery({
    query: FAVORITES_QUERY,
    data: {
      favorites: [...favorites, response.data.favorite],
    },
    variables,
  });
  return response;
}