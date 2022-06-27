import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useState } from "react";
import { SearchContext } from "../utils/searchContext";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

function MyApp({ Component, pageProps }: AppProps) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
      }}
    >
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SearchContext.Provider>
  );
}

export default MyApp;
