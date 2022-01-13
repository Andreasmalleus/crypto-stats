import { listings } from "../data";
import styles from "../styles/cryptolist.module.scss";
import Image from "next/image";

export const Cryptolist: React.FC = () => {
  const { data } = listings;

  const getColor = (val: number) => {
    return val > 0 ? "#2BB771" : "#DF2C4E";
  };

  const getFilters = (val: number) => {
    const prefixFilter = "brightness(0) saturate(100%)";
    return val > 0
      ? `${prefixFilter} invert(50%) sepia(53%) saturate(533%) hue-rotate(97deg) brightness(106%) contrast(95%)`
      : `${prefixFilter} brightness(0) saturate(100%) invert(27%) sepia(31%) saturate(5812%) hue-rotate(331deg) brightness(90%) contrast(94%)`;
  };

  const formatPercentageToTwoDecimalPlaces = (val: number) => {
    return val.toFixed(2);
  };

  const formatCurrency = (val: number) => {
    return val.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, ",");
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th></th>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h %</th>
          <th>7d %</th>
          <th>Market Cap</th>
          <th>Volume(24h)</th>
          <th>Circulating Suppply</th>
          <th>Last 7 days</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((listing, index) => (
          <tr key={listing.id}>
            <th>
              <Image
                src="/icons/star-empty.svg"
                alt=""
                width={20}
                height={20}
                className={styles.star}
              />
            </th>
            <th>{index + 1}</th>
            <th>
              <div className={styles.listingContainer}>
                <div style={{ borderRadius: "20px" }}>
                  <Image
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${listing.id}.png`}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
                <span className={styles.listingName}>{listing.name}</span>
                <span className={styles.listingSymbol}>{listing.symbol}</span>
                <button>Buy</button>
              </div>
            </th>
            <th>${formatCurrency(listing.quote.USD.price)}</th>
            <th
              style={{ color: getColor(listing.quote.USD.percent_change_24h) }}
            >
              {formatPercentageToTwoDecimalPlaces(
                listing.quote.USD.percent_change_24h
              )}
              %
            </th>
            <th
              style={{ color: getColor(listing.quote.USD.percent_change_7d) }}
            >
              {formatPercentageToTwoDecimalPlaces(
                listing.quote.USD.percent_change_7d
              )}
              %
            </th>
            <th>${formatCurrency(listing.quote.USD.market_cap)}</th>
            <th>${formatCurrency(listing.quote.USD.volume_24h)}</th>
            <th>
              <span className={styles.circulatingSupply}>
                {formatCurrency(listing.circulating_supply)}
              </span>
              <span>{listing.symbol}</span>
            </th>
            <th>
              <img
                src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${listing.id}.svg`}
                alt=""
                style={{
                  filter: getFilters(listing.quote.USD.percent_change_7d),
                }}
              />
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
