import { formatCurrency } from "../utils/formatCurrency";
import Image from "next/image";
import useSwr from "swr";
import { fetchRoute } from "../utils/fetchRoute";
import BeatLoader from "react-spinners/BeatLoader";

export const GlobalStats = () => {
  const { data, error, isValidating } = useSwr(
    "/api/metrics/latest",
    fetchRoute
  );

  if (error) {
    return null;
  }

  if (!data || isValidating) {
    return (
      <div className="w-full text-center h-10">
        <BeatLoader size={5} />
      </div>
    );
  }

  const {
    total_cryptocurrencies,
    active_exchanges,
    quote,
    btc_dominance,
    eth_dominance,
  } = data.data;

  return (
    <div className="max-w-screen-xl m-auto flex justify-between h-10 items-center">
      <div className="flex">
        <div className="mr-4 text-xs">
          <span className="mr-1">Cryptos:</span>
          <span className="font-headings">{total_cryptocurrencies}</span>
        </div>
        <div className="mr-4 text-xs">
          <span className="mr-1">Exchanges:</span>
          <span className="font-headings">{active_exchanges}</span>
        </div>
        <div className="mr-4 text-xs">
          <span className="mr-1">Market Cap:</span>
          <span className="font-headings">
            €{formatCurrency(quote.USD.total_market_cap)}
          </span>
        </div>
        <div className="mr-4 text-xs">
          <span className="mr-1">24h Vol:</span>
          <span className="font-headings">
            €{formatCurrency(quote.USD.total_volume_24h)}
          </span>
        </div>
        <div className="mr-4 text-xs">
          <span className="mr-1">Dominance:</span>
          <span className="font-headings mr-2">
            BTC {formatCurrency(btc_dominance)}%
          </span>
          <span className="font-headings">
            ETH {formatCurrency(eth_dominance)}%
          </span>
        </div>
      </div>
      <div className="flex text-xs items-center">
        <div className="flex items-center cursor-pointer">
          <Image src={"/images/EUR.png"} width={15} height={15} />
          <div className="font-headings ml-1">USD</div>
        </div>
        <div className="font-headings mx-2">/</div>
        <div className="cursor-pointer">
          <img src={"/icons/moon-filled.svg"} width={15} height={15} />
        </div>
      </div>
    </div>
  );
};
