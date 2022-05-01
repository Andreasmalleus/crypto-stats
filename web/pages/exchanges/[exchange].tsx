import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { wiki } from "../../data";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "../../utils/formatCurrency";
import useSWR from "swr";
import { fetchRoute } from "../../utils/fetchRoute";
import ClipLoader from "react-spinners/ClipLoader";
import { formatDate } from "../../utils/formatDate";
import { ExchangeTicker } from "../../types";

const ExchangePage: NextPage = () => {
  const router = useRouter();
  const { exchange } = router.query;

  const { data, error, isValidating } = useSWR(
    "/api/metrics/exchange?slug=" + exchange,
    fetchRoute
  );

  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Something went wrong...
      </div>
    );
  }

  if (!data || isValidating) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ClipLoader size={40} />
      </div>
    );
  }

  const {
    name,
    url,
    facebook_url,
    twitter_handle,
    reddit_url,
    trade_volume_24h_btc,
    image,
    tickers,
  } = data;

  return (
    <Layout>
      <div className="flex items-center text-xs text-slate-600 mb-10 p-1">
        <Link href="/exchanges">
          <a className="mr-2 cursor-pointer hover:underline">Exchanges</a>
        </Link>
        <Image src="/icons/arrow-right.svg" width={10} height={10} />
        <a className="ml-2 text-black">{name}</a>
      </div>
      <div className="flex">
        <section className="w-4/12">
          <div className="flex items-center mb-8">
            <Image
              src={image}
              width={30}
              height={30}
              className="rounded-full"
            />
            <div className="text-3xl ml-3 font-headings">{name}</div>
          </div>
          <div className="flex flex-col text-blue-500">
            <div className="flex">
              <Image src="/icons/link.svg" width={20} height={20} />
              <a href={url} target="_blank" className="ml-2">
                {url}
              </a>
            </div>
            <div className="flex">
              <Image src="/icons/facebook.svg" width={20} height={20} />
              <a href={facebook_url} target="_blank" className="ml-2">
                facebook
              </a>
            </div>
            <div className="flex">
              <Image src="/icons/twitter.svg" width={20} height={20} />
              <a
                href={`https://twitter.com/${twitter_handle}`}
                target="_blank"
                className="ml-2"
              >
                @{name}
              </a>
            </div>
            <div className="flex">
              <Image src="/icons/reddit.svg" width={20} height={20} />
              <a href={reddit_url} target="_blank" className="ml-2">
                reddit
              </a>
            </div>
          </div>
        </section>
        <section className="w-8/12">
          <div className="text-xs mb-2">Volume (24h)</div>
          <div className="text-4xl font-headings">
            {formatCurrency(trade_volume_24h_btc)} BTC
          </div>
        </section>
      </div>
      <div className="mt-5">
        <h1 className="font-headings text-md mb-5">Markets</h1>
        <table className="w-full m-auto border-collapse">
          <thead>
            <tr className="font-headings">
              <th className="table-header text-left">#</th>
              <th className="table-header text-left">Currency</th>
              <th className="table-header">Pair</th>
              <th className="table-header">Volume</th>
              <th className="table-header">Bid-Ask Spread</th>
              <th className="table-header">Last trade</th>
            </tr>
          </thead>
          <tbody className="border-b-2 border-slate-100">
            {tickers.map((ticker: ExchangeTicker, index: number) => (
              <tr
                key={index}
                className="border-b-2 border-slate-100 transition duration-250 hover:bg-slate-100 cursor-pointer"
                onClick={() => router.push(`/currencies/${ticker.coin_id}`)}
              >
                <th className="table-entry text-left py-5">{index + 1}</th>
                <th className="table-entry text-left font-headings">
                  {ticker.base}
                </th>
                <th className="table-entry text-blue-500">
                  {ticker.base}/{ticker.target}
                </th>
                <th className="table-entry">{formatCurrency(ticker.volume)}</th>
                <th className="table-entry">
                  {ticker.bid_ask_spread_percentage}%
                </th>
                <th className="table-entry">
                  {formatDate(ticker.last_traded_at)}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <h1 className="font-headings text-md mt-2 mb-4">What is {name}?</h1>
        <p className="text-justify leading-10">
          {wiki.query.pages[28249265].extract}
        </p>
      </div>
    </Layout>
  );
};

export default ExchangePage;
