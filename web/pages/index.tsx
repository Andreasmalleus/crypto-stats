import type { NextPage } from "next";
import React, { useState } from "react";
import { Cryptolist } from "../components/CryptoList";
import { Layout } from "../components/Layout";
import { SearchContext } from "../utils/searchContext";

const Home: NextPage = () => {
  return (
    <Layout>
      <Cryptolist />
    </Layout>
  );
};

export default Home;
