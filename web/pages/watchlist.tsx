import { useMutation, useQuery } from "@apollo/client";
import { Layout } from "../components/Layout";
import { FAVORITES_QUERY } from "../graphql/queries";
import ClipLoader from "react-spinners/ClipLoader";
import { Favorite, Listing } from "../types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetchRoute } from "../utils/fetchRoute";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentageToTwoDecimalPlaces } from "../utils/formatPercentage";
import { getColor } from "../utils/getColor";
import Link from "next/link";
import Image from "next/image";
import { Table } from "../components/Table";
import { getFilters } from "../utils/getFilters";
import { UNFAVORITE_MUTATION } from "../graphql/mutations";
import { handleRemoveFromWatchlist } from "../utils/handleWatchlist";

interface WatchlistProps {}

const Watchlist: React.FC<WatchlistProps> = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [removeFromWishlist] = useMutation(UNFAVORITE_MUTATION);
  const [listings, setListings] = useState<Listing[]>([]);

  const { data, loading } = useQuery(FAVORITES_QUERY, {
    variables: {
      category: "crypto",
    },
  });

  const getCommaSeperatedIds = () => {
    if (data && data.favorites) {
      return data.favorites.map((f: Favorite) => f.id).join(",");
    }
    return;
  };

  const {
    data: wishlist,
    isValidating,
    error,
  } = useSWR(
    shouldFetch ? `api/quotes/latest?id=${getCommaSeperatedIds()}` : null,
    fetchRoute
  );

  useEffect(() => {
    if (data && data.favorites) {
      setShouldFetch(true);
    }
    if (wishlist) {
      setListings(mapListingsToArray(data.favorites, wishlist.data));
    }
  }, [data, wishlist]);

  const mapListingsToArray = (favorites: Favorite[], listings: any) => {
    return favorites.map((f) => {
      let id = f.id;
      let listing = listings[id];
      return listing;
    });
  };

  if (loading || isValidating) {
    return (
      <Layout>
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader size={40} />
        </div>
      </Layout>
    );
  }

  const handleRemove = async (id: number) => {
    handleRemoveFromWatchlist(id, removeFromWishlist);
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <Layout>
      {error ? (
        <div>{error}</div>
      ) : (
        <Table
          headers={[
            "",
            "#",
            "Name",
            "Price",
            "24h %",
            "7d %",
            "Market Cap",
            "Volume(24h)",
            "Circulating Supply",
            "Last 7 days",
          ]}
        >
          {listings.map((listing: Listing, index: number) => {
            return (
              <tr
                key={listing.id}
                className="border-b-2 border-slate-100 transition duration-250 hover:bg-slate-100"
              >
                <th className="table-entry text-left px-3">
                  <Image
                    src="/icons/star-full.svg"
                    alt=""
                    width={13}
                    height={13}
                    className="cursor-pointer"
                    onClick={() => handleRemove(listing.id)}
                  />
                </th>
                <th className="table-entry text-left">{index + 1}</th>
                <th className="table-entry text-left">
                  <Link href={`/currencies/${listing.slug}`}>
                    <div className="flex justify-center items-center cursor-pointer">
                      <Image
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${listing.id}.png`}
                        alt=""
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="ml-2">{listing.name}</span>
                      <span className="ml-2 text-slate-400">
                        {listing.symbol}
                      </span>
                      <button className="ml-2 text-black rounded-md text-xs py-1 px-2 cursor-pointer m-auto bg-slate-200">
                        Buy
                      </button>
                    </div>
                  </Link>
                </th>
                <Link href={`/currencies/${listing.slug}`}>
                  <th style={{ cursor: "pointer" }} className="table-entry">
                    ${formatCurrency(listing.quote.EUR.price)}
                  </th>
                </Link>
                <th
                  style={{
                    color: getColor(listing.quote.EUR.percent_change_24h),
                  }}
                  className="table-entry"
                >
                  <div className="flex items-center justify-end">
                    <Image
                      src={
                        listing.quote.EUR.percent_change_24h > 0
                          ? "/icons/caret-up.svg"
                          : "/icons/caret-down.svg"
                      }
                      width={10}
                      height={10}
                    />
                    <div className="ml-1">
                      {" "}
                      {formatPercentageToTwoDecimalPlaces(
                        listing.quote.EUR.percent_change_24h
                      )}
                      %
                    </div>
                  </div>
                </th>
                <th
                  style={{
                    color: getColor(listing.quote.EUR.percent_change_7d),
                  }}
                  className="table-entry"
                >
                  <div className="flex items-center justify-end">
                    <Image
                      src={
                        listing.quote.EUR.percent_change_7d > 0
                          ? "/icons/caret-up.svg"
                          : "/icons/caret-down.svg"
                      }
                      width={10}
                      height={10}
                    />
                    <div className="ml-1">
                      {formatPercentageToTwoDecimalPlaces(
                        listing.quote.EUR.percent_change_7d
                      )}
                      %
                    </div>
                  </div>
                </th>
                <th className="table-entry">
                  ${formatCurrency(listing.quote.EUR.market_cap)}
                </th>
                <th className="table-entry">
                  ${formatCurrency(listing.quote.EUR.volume_24h)}
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
                        filter: getFilters(listing.quote.EUR.percent_change_7d),
                        cursor: "pointer",
                        display: "inline",
                      }}
                    />
                  </Link>
                </th>
              </tr>
            );
          })}
        </Table>
      )}
    </Layout>
  );
};

export default Watchlist;
