import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { metaData, coin } from "../../data";
import { NameSection } from "../../components/NameSection";
import { StatsSection } from "../../components/StatsSection";
import Image from "next/image";
import Link from "next/link";
import { Chart } from "../../components/Chart";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatPercentageToTwoDecimalPlaces } from "../../utils/formatPercentage";
import { getColor } from "../../utils/getColor";

const CryptoPage: NextPage = () => {
  const router = useRouter();
  const { currency } = router.query;
  const {
    data: {
      1: { name, symbol, description, logo, category, tags },
    },
  } = metaData;
  const {
    data: {
      BTC: {
        max_supply,
        circulating_supply,
        total_supply,
        quote,
        cmc_rank,
        last_updated,
      },
    },
  } = coin;

  return (
    <Layout>
      <div className="flex items-center text-xs text-slate-600 mb-10 p-1">
        <Link href="/">
          <a className="mr-2 cursor-pointer hover:underline">
            Cryptocurrencies
          </a>
        </Link>
        <Image src="/icons/arrow-right.svg" width={10} height={10} />
        <Link href="/">
          <a className="mr-2 ml-2 cursor-pointer hover:underline">Coins</a>
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
        <div className="flex-col w-8/12">
          <Chart />
          Converter
        </div>
        <div className="w-4/12 ml-10">
          <h1 className="font-headings text-2xl mb-6">
            {symbol} price statistics
          </h1>
          <div className="text-xs pb-2 border-b-2 border-slate-100">
            Bitcoin Price Today
          </div>
          <div className="flex justify-between py-4 border-b-2 border-slate-100">
            <div className="text-sm text-slate-500">Bitcoin Price</div>
            <div className="font-headings text-sm">
              €{formatCurrency(quote.EUR.price)}
            </div>
          </div>
          <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
            <div className="flex items-center text-slate-500 p">
              <div className="text-sm mr-1">Price Change</div>
              <div className="text-xs bg-slate-100 p-1 rounded">24h</div>
            </div>
            <div className="flex-col">
              <div className="text-sm">
                €
                {formatCurrency(quote.EUR.percent_change_24h * quote.EUR.price)}
              </div>
              <div
                className="text-right text-xs font-headings"
                style={{ color: getColor(quote.EUR.percent_change_24h) }}
              >
                {formatPercentageToTwoDecimalPlaces(
                  quote.EUR.percent_change_24h
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between py-4 border-b-2 border-slate-100">
            <div className="flex items-center text-slate-500 p">
              <div className="text-sm mr-1">Trading Volume</div>
              <div className="text-xs bg-slate-100 p-1 rounded">24h</div>
            </div>
            <div className="flex-col">
              <div className="text-sm">
                €{formatCurrency(quote.EUR.volume_24h)}
              </div>
              <div
                className="text-right text-xs font-headings"
                style={{ color: getColor(quote.EUR.volume_change_24h) }}
              >
                {formatPercentageToTwoDecimalPlaces(
                  quote.EUR.volume_change_24h
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between py-4 border-b-2 border-slate-100 mb-10">
            <div className="text-sm text-slate-500">Market Rank</div>
            <div className="text-sm">#{cmc_rank}</div>
          </div>
          <div className="text-xs pb-2 border-b-2 border-slate-100">
            {name} Market Cap
          </div>
          <div className="flex justify-between py-4 border-b-2 border-slate-100">
            <div className="text-sm text-slate-500">Market Cap</div>
            <div className="font-headings text-sm">
              €{formatCurrency(quote.EUR.market_cap)}
            </div>
          </div>
          <div className="flex justify-between py-4 border-b-2 border-slate-100">
            <div className="text-sm text-slate-500">Market Cap Dominance</div>
            <div className="text-sm">
              €{formatCurrency(quote.EUR.market_cap_dominance)}
            </div>
          </div>
          <div className="flex justify-between py-4 border-b-2 border-slate-100">
            <div className="text-sm text-slate-500">
              Fully Diluted Market Cap
            </div>
            <div className="text-sm">
              €{formatCurrency(quote.EUR.fully_diluted_market_cap)}
            </div>
          </div>
        </div>
      </div>
      <div>About this currency</div>
    </Layout>
  );
};

export default CryptoPage;
