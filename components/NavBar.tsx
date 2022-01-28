import React from "react";
import { GlobalStats } from "./GlobalStats";

export const Navbar: React.FC = () => {
  return (
    <div>
      <GlobalStats />
      <header className="h-50 flex justify-between top-0 z-50 max-w-screen-xl m-auto mb-8 font-headings">
        <div className="flex items-center">
          <div className="text-xl mr-8">CryptoMarketStats</div>
          <div className="flex items-center">
            <div className="text-xs mr-8 transition duration-200 hover:text-slate-500 cursor-pointer">
              Cyptocurrencies
            </div>
            <div className="text-xs mr-8 transition duration-200 hover:text-slate-500 cursor-pointer">
              Exchanges
            </div>
            <div className="text-xs mr-8 transition duration-200 hover:text-slate-500 cursor-pointer">
              Favorites
            </div>
          </div>
        </div>
        <div className="flex items-center font-body">
          <button className="btn-primary bg-transparent mr-4 text-black">
            Log in
          </button>
          <button className="btn-primary mr-4">Sign up</button>
          <input
            className="btn-primary w-48 placeholder-white"
            placeholder="Search"
          />
        </div>
      </header>
    </div>
  );
};
