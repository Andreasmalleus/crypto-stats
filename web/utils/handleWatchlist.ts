import { ApolloCache, MutationFunction } from "@apollo/client";
import { FAVORITES_QUERY } from "../graphql/queries";
import { Favorite } from "../types";

const category = "crypto";

export const handleRemoveFromWatchlist = async (
  cryptoId: number,
  favorites: Favorite[],
  removeFromWishlist: MutationFunction,
  cache: ApolloCache<Object>
) => {
  const variables = {
    cryptoId,
    category,
  };
  const response = await removeFromWishlist({
    variables,
  });
  cache.writeQuery({
    query: FAVORITES_QUERY,
    data: {
      favorites: favorites.filter((favorite) => favorite.cryptoId !== cryptoId),
    },
    variables,
  });
  return response;
};

export const handleAddToWatchlist = async (
  cryptoId: number,
  favorites: Favorite[],
  addToWishlist: MutationFunction,
  cache: ApolloCache<Object>
) => {
  const variables = {
    cryptoId,
    category,
  };
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
  console.log(cache);
  return response;
};
