import type { NextPage } from "next";
import { Cryptolist } from "../components/CryptoList";
import { NavBar } from "../components/NavBar";

const Home: NextPage = () => {
  return (
    <div>
      <NavBar />
      <Cryptolist />
    </div>
  );
};

export default Home;
