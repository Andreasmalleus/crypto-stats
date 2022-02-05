import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { GlobalStats } from "./GlobalStats";

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <div>
      <GlobalStats />
      <header className="h-50 flex justify-between top-0 z-50 max-w-screen-xl m-auto mb-8 font-headings">
        <div className="flex items-center">
          <Link href={"/"}>
            <a className="text-xl mr-8 cursor-pointer">CryptoMarketStats</a>
          </Link>
          <div className="flex items-center">
            <a className="text-xs mr-8 transition duration-200 hover:text-indigo-600 cursor-pointer">
              Cyptocurrencies
            </a>
            <a className="text-xs mr-8 transition duration-200 hover:text-indigo-600 cursor-pointer">
              Exchanges
            </a>
            <a className="text-xs mr-8 transition duration-200 hover:text-indigo-600 cursor-pointer">
              Favorites
            </a>
          </div>
        </div>
        <div className="flex items-center font-body">
          <button
            className="btn-primary bg-transparent mr-4 text-black"
            onClick={() => router.push("/login")}
          >
            Log in
          </button>
          <button
            className="btn-primary mr-4"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
          <input
            className="btn-primary w-48 placeholder-white"
            placeholder="Search"
          />
        </div>
      </header>
    </div>
  );
};
