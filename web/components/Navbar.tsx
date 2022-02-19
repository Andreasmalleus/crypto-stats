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
            <a className="text-2xl mr-8 cursor-pointer tracking-widest">
              FAVCRYPTOS
            </a>
          </Link>
          <div className="flex items-center">
            <Link href={"/"}>
              <a className="text-xs mr-8 transition duration-200 hover:text-slate-400 cursor-pointer">
                Cyptocurrencies
              </a>
            </Link>
            <Link href={"/exchanges"}>
              <a className="text-xs mr-8 transition duration-200 hover:text-slate-400 cursor-pointer">
                Exchanges
              </a>
            </Link>
            <Link href={"/favorites"}>
              <a className="text-xs mr-8 transition duration-200 hover:text-slate-400 cursor-pointer">
                Favorites
              </a>
            </Link>
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
            className="btn-primary mr-4 shadow-lg"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
          <input
            className="btn-primary w-48 placeholder-white shadow-lg"
            placeholder="Search"
          />
        </div>
      </header>
    </div>
  );
};
