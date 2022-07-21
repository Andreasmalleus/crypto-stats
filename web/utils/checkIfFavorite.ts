import { Favorite } from "../types";

export const checkIfFavorite = (
  cryptoId: number,
  favorites: Favorite[]
): boolean => {
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i]?.cryptoId === cryptoId) {
      return true;
    }
  }
  return false;
};
