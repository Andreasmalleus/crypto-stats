import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { Layout } from "../components/Layout";
import { FAVORITES_QUERY } from "../graphql/queries";
import ClipLoader from "react-spinners/ClipLoader";
import { Favorite, Listing } from "../types";
import { useContext, useEffect, useState } from "react";
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
import { SearchContext } from "../utils/searchContext";
import { GenericList } from "../components/GenericList";

interface WatchlistProps {}

const Watchlist: React.FC<WatchlistProps> = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const [removeFromWishlist] = useMutation(UNFAVORITE_MUTATION);
  const [listings, setListings] = useState<Listing[]>([]);
  const apollo = useApolloClient();
  const { searchInput } = useContext(SearchContext);

  const { data, loading } = useQuery(FAVORITES_QUERY, {
    variables: {
      category: "crypto",
    },
  });

  const getCommaSeperatedIds = () => {
    if (data && data.favorites) {
      return data.favorites.map((f: Favorite) => f.cryptoId).join(",");
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
    return favorites.map((f: Favorite) => {
      let id = f.cryptoId;
      let listing = listings[id];
      return listing;
    });
  };

  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Something went wrong...
      </div>
    );
  }

  if (loading || isValidating) {
    return (
      <Layout>
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader size={40} />
        </div>
      </Layout>
    );
  }

  if (listings.length == 0) {
    return (
      <Layout>
        <div className="w-full h-full flex justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <Image src={"/icons/search.svg"} width={80} height={80} />
            <p className="font-headings text-xl mb-4 mt-4">
              Watchlist is currently empty!
            </p>
            <Link href={"/"}>
              <p className="text-xs underline">Add something new...</p>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  console.log(listings);

  const handleRemove = async (id: number) => {
    handleRemoveFromWatchlist(
      id,
      data.favorites,
      removeFromWishlist,
      apollo.cache
    );
    setListings(listings.filter((listing) => listing.id !== id));
  };

  return (
    <Layout>
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
        <GenericList
          items={listings}
          keyExtractor={(listing) => listing.id.toString()}
          filter={({ name }) => name.trim().toLowerCase().includes(searchInput)}
          renderItem={(
            { id, name, slug, symbol, quote, circulating_supply },
            index
          ) => (
            <tr className="border-b-2 border-slate-100 transition duration-250 hover:bg-slate-100">
              <th className="table-entry text-left px-3">
                <Image
                  src="/icons/star-full.svg"
                  alt=""
                  width={13}
                  height={13}
                  className="cursor-pointer"
                  onClick={() => {
                    handleRemove(id);
                  }}
                />
              </th>
              <th className="table-entry text-left pr-2">{index + 1}</th>
              <th className="table-entry text-left">
                <Link href={`/currencies/${slug}`}>
                  <div className="flex items-center cursor-pointer">
                    <Image
                      src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="ml-2">{name}</span>
                    <span className="ml-2 text-slate-400">{symbol}</span>
                  </div>
                </Link>
              </th>
              <Link href={`/currencies/${slug}`}>
                <th style={{ cursor: "pointer" }} className="table-entry">
                  €{formatCurrency(quote.EUR.price)}
                </th>
              </Link>
              <th
                style={{ color: getColor(quote.EUR.percent_change_24h) }}
                className="table-entry"
              >
                <div className="flex items-center justify-end">
                  <Image
                    src={
                      quote.EUR.percent_change_24h > 0
                        ? "/icons/caret-up.svg"
                        : "/icons/caret-down.svg"
                    }
                    width={10}
                    height={10}
                  />
                  <div className="ml-1">
                    {" "}
                    {formatPercentageToTwoDecimalPlaces(
                      quote.EUR.percent_change_24h
                    )}
                    %
                  </div>
                </div>
              </th>
              <th
                style={{ color: getColor(quote.EUR.percent_change_7d) }}
                className="table-entry"
              >
                <div className="flex items-center justify-end">
                  <Image
                    src={
                      quote.EUR.percent_change_7d > 0
                        ? "/icons/caret-up.svg"
                        : "/icons/caret-down.svg"
                    }
                    width={10}
                    height={10}
                  />
                  <div className="ml-1">
                    {formatPercentageToTwoDecimalPlaces(
                      quote.EUR.percent_change_7d
                    )}
                    %
                  </div>
                </div>
              </th>
              <th className="table-entry">
                €{formatCurrency(quote.EUR.market_cap)}
              </th>
              <th className="table-entry">
                €{formatCurrency(quote.EUR.volume_24h)}
              </th>
              <th className="table-entry">
                <span className="mr-1">
                  {formatCurrency(circulating_supply)}
                </span>
                <span>{symbol}</span>
              </th>
              <th className="table-entry">
                <Link href={`/currencies/${name.toLowerCase()}`}>
                  <img
                    src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${id}.svg`}
                    alt=""
                    style={{
                      filter: getFilters(quote.EUR.percent_change_7d),
                      cursor: "pointer",
                      display: "inline",
                    }}
                  />
                </Link>
              </th>
            </tr>
          )}
        />
      </Table>
    </Layout>
  );
};

export default Watchlist;
