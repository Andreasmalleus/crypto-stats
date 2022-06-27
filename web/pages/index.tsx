import type { NextPage } from "next";
import React, { useState } from "react";
import { Cryptolist } from "../components/CryptoList";
import { Layout } from "../components/Layout";
import { SearchContext } from "../utils/searchContext";

const Home: NextPage = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchInput,
        setSearchInput,
      }}
    >
      <Layout>
        <Cryptolist />
      </Layout>
    </SearchContext.Provider>
  );
};

export default Home;
