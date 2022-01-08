import { general } from "../data";
import styles from "../styles/globalstats.module.scss";

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
    <div className={styles.globalStats}>
      <div className={styles.globalStatsContainer}>
        <div>
          <span>Cryptos:</span>
          <span>{total_cryptocurrencies}</span>
        </div>
        <div>
          <span>Exchanges:</span>
          <span>{active_exchanges}</span>
        </div>
        <div>
          <span>Market Cap:</span>
          <span>{quote.USD.total_market_cap}</span>
        </div>
        <div>
          <span>24h Vol:</span>
          <span>{quote.USD.total_volume_24h}</span>
        </div>
        <div>
          <span>Dominance:</span>
          <span>BTC {btc_dominance} </span>
          <span>ETH {eth_dominance}</span>
        </div>
      </div>
      <div className={styles.options}>
        <div>Currency switch</div>
        <div>Light/dark</div>
      </div>
    </div>
  );
};
