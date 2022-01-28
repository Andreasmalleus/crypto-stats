import { listings } from "../data";
import Image from "next/image";
import Link from "next/link";
import { getColor } from "../utils/getColor";
import { getFilters } from "../utils/getFilters";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentageToTwoDecimalPlaces } from "../utils/formatPercentage";

export const Cryptolist: React.FC = () => {
  const { data } = listings;

  return (
    <table className="w-full m-auto border-collapse">
      <thead>
        <tr className="font-headings">
          <th className="table-header text-left"></th>
          <th className="table-header text-left">#</th>
          <th className="table-header text-left">Name</th>
          <th className="table-header">Price</th>
          <th className="table-header">24h %</th>
          <th className="table-header">7d %</th>
          <th className="table-header">Market Cap</th>
          <th className="table-header">Volume(24h)</th>
          <th className="table-header">Circulating Suppply</th>
          <th className="table-header">Last 7 days</th>
        </tr>
      </thead>
      <tbody className="border-b-2 border-slate-100">
        {data.map((listing, index) => (
          <tr
            key={listing.id}
            className="border-b-2 border-slate-100 transition duration-250"
          >
            <th className="table-entry text-left px-3">
              <Image
                src="/icons/star-empty.svg"
                alt=""
                width={13}
                height={13}
                className="cursor-pointer"
              />
            </th>
            <th className="table-entry text-left">{index + 1}</th>
            <th className="table-entry text-left">
              <Link href={`/currencies/${listing.name.toLowerCase()}`}>
                <div className="flex justify-center items-center cursor-pointer">
                  <Image
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${listing.id}.png`}
                    alt=""
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="ml-2">{listing.name}</span>
                  <span className="ml-2 text-slate-400">{listing.symbol}</span>
                  <button className="ml-2 text-black rounded-md text-xs py-1 px-2 cursor-pointer m-auto bg-slate-200">
                    Buy
                  </button>
                </div>
              </Link>
            </th>
            <Link href={`/currencies/${listing.name.toLowerCase()}`}>
              <th style={{ cursor: "pointer" }} className="table-entry">
                ${formatCurrency(listing.quote.USD.price)}
              </th>
            </Link>
            <th
              style={{ color: getColor(listing.quote.USD.percent_change_24h) }}
              className="table-entry"
            >
              {formatPercentageToTwoDecimalPlaces(
                listing.quote.USD.percent_change_24h
              )}
              %
            </th>
            <th
              style={{ color: getColor(listing.quote.USD.percent_change_7d) }}
              className="table-entry"
            >
              {formatPercentageToTwoDecimalPlaces(
                listing.quote.USD.percent_change_7d
              )}
              %
            </th>
            <th className="table-entry">
              ${formatCurrency(listing.quote.USD.market_cap)}
            </th>
            <th className="table-entry">
              ${formatCurrency(listing.quote.USD.volume_24h)}
            </th>
            <th className="table-entry">
              <span className="mr-1">
                {formatCurrency(listing.circulating_supply)}
              </span>
              <span>{listing.symbol}</span>
            </th>
            <th className="table-entry">
              <Link href={`/currencies/${listing.name.toLowerCase()}`}>
                <img
                  src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${listing.id}.svg`}
                  alt=""
                  style={{
                    filter: getFilters(listing.quote.USD.percent_change_7d),
                    cursor: "pointer",
                    display: "inline",
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
