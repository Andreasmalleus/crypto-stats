import { Favorite } from "../types";

export const checkIfFavorite = (id: number, favorites : Favorite[]) : boolean=> {
  for (let i = 0; i < favorites.length; i++) {
    if (favorites[i].id === id) {
      return true;
    }
  }
  return false;
}