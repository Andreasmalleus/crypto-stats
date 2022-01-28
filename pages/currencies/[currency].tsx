import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { metaData, coin } from "../../data";
import { NameSection } from "../../components/NameSection";
import { StatsSection } from "../../components/StatsSection";

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
      <div className="flex">
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
      <div>GRAPH</div>
      <div>About this currency</div>
    </Layout>
  );
};

export default CryptoPage;
