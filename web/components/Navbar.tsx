import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GlobalStats } from "./GlobalStats";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../graphql/queries";
import Image from "next/image";
import { Modal } from "./Modal";

export const Navbar: React.FC = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(ME_QUERY);
  const [isShown, setIsShown] = useState(false);

  let isMe = data?.me ? true : false;

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
            {isMe ? (
              <Link href={"/favorites"}>
                <a className="text-xs mr-8 transition duration-200 hover:text-slate-400 cursor-pointer">
                  Favorites
                </a>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="flex items-center font-body relative">
          {loading ? <div className="text-sm">Loading...</div> : null}
          {error ? <div className="text-sm">Error...</div> : null}

          {isMe ? (
            <div
              className="text-xs mr-2"
              onMouseOver={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
            >
              <Image src="/icons/user.svg" width={30} height={30} />
              <Modal
                username={data?.me.username}
                isShown={isShown}
                setIsShown={setIsShown}
              />
            </div>
          ) : (
            <>
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
            </>
          )}
          <input
            className="btn-primary w-48 placeholder-white shadow-lg"
            placeholder="Search"
          />
        </div>
      </header>
    </div>
  );
};
