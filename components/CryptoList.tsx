import { listings } from "../data";
import styles from "../styles/cryptolList.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getColor } from "../utils/getColor";
import { getFilters } from "../utils/getFilters";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentageToTwoDecimalPlaces } from "../utils/formatPercentage";

export const Cryptolist: React.FC = () => {
  const { data } = listings;

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
                width={13}
                height={13}
                className={styles.star}
              />
            </th>
            <th>{index + 1}</th>
            <th>
              <Link href={`/currencies/${listing.name.toLowerCase()}`}>
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
              </Link>
            </th>
            <Link href={`/currencies/${listing.name.toLowerCase()}`}>
              <th style={{ cursor: "pointer" }}>
                ${formatCurrency(listing.quote.USD.price)}
              </th>
            </Link>
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
              <Link href={`/currencies/${listing.name.toLowerCase()}`}>
                <img
                  src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${listing.id}.svg`}
                  alt=""
                  style={{
                    filter: getFilters(listing.quote.USD.percent_change_7d),
                    cursor: "pointer",
                  }}
                />
              </Link>
            </th>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
