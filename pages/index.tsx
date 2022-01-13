import type { NextPage } from "next";
import { Cryptolist } from "../components/CryptoList";
import { Layout } from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Cryptolist />
    </Layout>
  );
};

export default Home;
