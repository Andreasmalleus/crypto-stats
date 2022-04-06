import { NextPage } from "next";
import { Layout } from "../../components/Layout";
import { wiki } from "../../data";
import { NameSection } from "../../components/NameSection";
import { StatsSection } from "../../components/StatsSection";
import Image from "next/image";
import Link from "next/link";
import { Chart } from "../../components/Chart";
import { Converter } from "../../components/Converter";
import { SideSection } from "../../components/SideSection";
import { Router, withRouter } from "next/router";
import useSWR from "swr";
import { fetchRoute } from "../../utils/fetchRoute";
import { ClipLoader } from "react-spinners";

const CryptoPage: NextPage<any> = ({ router }) => {
  const { currency } = router.query;
  const { data, error, isValidating } = useSWR(
    `/api/quotes/latest?slug=${currency}`,
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

  const currencyId: string = Object.keys(data.data)[0];
  const {
    name,
    symbol,
    tags,
    max_supply,
    circulating_supply,
    total_supply,
    quote,
    cmc_rank,
    last_updated,
  } = data.data[currencyId];

  const logo = `https://s2.coinmarketcap.com/static/img/coins/64x64/${currencyId}.png`;
  const category = "coin";

  return (
    <Layout>
      <div className="flex items-center text-xs text-slate-600 mb-10 p-1">
        <Link href="/">
          <a className="mr-2 cursor-pointer hover:underline">
            Cryptocurrencies
          </a>
        </Link>
        <Image src="/icons/arrow-right.svg" width={10} height={10} />
        <a className="ml-2 text-black">{name}</a>
      </div>
      <div className="flex mb-10">
        <NameSection
          {...{
            logo,
            name,
            symbol,
            rank: cmc_rank,
            category,
            updated: last_updated,
            tags,
          }}
        />
        <StatsSection
          {...{
            name,
            symbol,
            price: quote.EUR.price,
            percentChange1h: quote.EUR.percent_change_1h,
            marketCap: quote.EUR.market_cap,
            marketCapDominance: quote.EUR.market_cap_dominance,
            fullyDilutedMarket_cap: quote.EUR.fully_diluted_market_cap,
            volume24h: quote.EUR.volume_24h,
            circulatinSupply: circulating_supply,
            maxSupply: max_supply,
            totalSupply: total_supply,
          }}
        />
      </div>
      <div className="flex">
        <div className="flex-col w-8/12 items-center">
          <Chart slug={currency} />
          <Converter logo={logo} symbol={symbol} name={name} />
        </div>
        <SideSection
          name={name}
          symbol={symbol}
          price={quote.EUR.price}
          percentChange24h={quote.EUR.percent_change_24h}
          volume24h={quote.EUR.volume_24h}
          volumeChange24h={quote.EUR.volume_change_24h}
          rank={cmc_rank}
          marketCap={quote.EUR.market_cap}
          dominance={quote.EUR.market_cap_dominance}
          dilutedValue={quote.EUR.fully_diluted_market_cap}
        />
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

export default withRouter(CryptoPage);
