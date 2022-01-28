import { general } from "../data";

export const GlobalStats = () => {
  const {
    data: {
      total_cryptocurrencies,
      active_exchanges,
      quote,
      btc_dominance,
      eth_dominance,
    },
  } = general;

  return (
    <div className="max-w-screen-xl m-auto flex justify-between my-4 items-center">
      <div className="flex">
        <div className="mr-4 text-xs">
          <span className="mr-1">Cryptos:</span>
          <span className="text-indigo-600">{total_cryptocurrencies}</span>
        </div>
        <div className="mr-4 text-xs">
          <span className="mr-1">Exchanges:</span>
          <span className="text-indigo-600">{active_exchanges}</span>
        </div>
        <div className="mr-4 text-xs">
          <span className="mr-1">Market Cap:</span>
          <span className="text-indigo-600">{quote.USD.total_market_cap}</span>
        </div>
        <div className="mr-4 text-xs">
          <span className="mr-1">24h Vol:</span>
          <span className="text-indigo-600">{quote.USD.total_volume_24h}</span>
        </div>
        <div className="mr-4 text-xs">
          <span className="mr-1">Dominance:</span>
          <span className="text-indigo-600">BTC {btc_dominance} </span>
          <span className="text-indigo-600">ETH {eth_dominance}</span>
        </div>
      </div>
      <div className="flex text-xs">
        <div className="mr-2">Currency switch</div>
        <div>Light/dark</div>
      </div>
    </div>
  );
};
