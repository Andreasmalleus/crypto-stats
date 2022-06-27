import React from "react";

export const SearchContext = React.createContext({
  searchInput: "",
  setSearchInput: (searchInput: string) => {},
});