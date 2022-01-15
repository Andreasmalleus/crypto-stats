import styles from "../styles/statsSection.module.scss";
import { formatCurrency } from "../utils/formatCurrency";
import { getColor } from "../utils/getColor";

interface StatsSectionProps {
  name: string;
  symbol: string;
  price: number;
  percentChange1h: number;
  marketCap: number;
  marketCapDominance: number;
  fullyDilutedMarket_cap: number;
  volume24h: number;
  circulatinSupply: number;
  maxSupply: number;
  totalSupply: number;
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  name,
  symbol,
  price,
  percentChange1h,
  marketCap,
  marketCapDominance,
  fullyDilutedMarket_cap,
  volume24h,
  circulatinSupply,
  maxSupply,
  totalSupply,
}) => {
  const calculatePercentageFromSupply = (
    maxSupply: number,
    circulatingSupply: number
  ) => {
    return (circulatingSupply / maxSupply) * 100;
  };
  const volumePercentage = calculatePercentageFromSupply(
    maxSupply,
    circulatinSupply
  );

  return (
    <div className={styles.statsSection}>
      <div className={styles.heading}>
        {name} Price ({symbol})
      </div>
      <div className={styles.priceContainer}>
        <div className={styles.price}>€ {formatCurrency(price)}</div>
        <div
          className={styles.percentChange}
          style={{
            backgroundColor: getColor(percentChange1h),
          }}
        >
          {formatCurrency(percentChange1h)}%
        </div>
        <div className={styles.buyOptions}>
          <button>Buy</button>
          <button>Exchange</button>
        </div>
      </div>
      {/* statistics about the currency itself */}
      <div className={styles.statsContainer}>
        <Stat title="Market Cap" value={marketCap} />
        <Stat title="Market Cap Dominance" value={marketCapDominance} />
        <Stat title="Fully Diluted Market Cap" value={fullyDilutedMarket_cap} />
        <Stat title="Volume" value={volume24h} />
        {/* Stat column with more information */}
        <div className={styles.stat}>
          <div className={styles.statHeading}>Circulating Supply</div>
          <div className={styles.priceWithPercentage}>
            <div className={styles.rate}>
              {formatCurrency(circulatinSupply)} {symbol}
            </div>
            <div className={styles.percentage}>
              {volumePercentage.toFixed(0)}%
            </div>
          </div>
          <div className={styles.statsBar}>
            <div
              className={styles.fill}
              style={{
                width: `${volumePercentage}%`,
              }}
            ></div>
          </div>
          <div className={styles.maxSupply}>
            <div className={styles.statHeading}>Max Supply:</div>
            <div className={styles.rate}>{formatCurrency(maxSupply)}</div>
          </div>
          <div className={styles.totalSupply}>
            <div className={styles.statHeading}>Total Supply:</div>
            <div className={styles.rate}>{formatCurrency(totalSupply)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<{ value: number; title: string }> = ({ value, title }) => {
  return (
    <div className={styles.stat}>
      <div className={styles.statHeading}>{title}</div>
      <div className={styles.rate}>€{formatCurrency(value)}</div>
    </div>
  );
};
