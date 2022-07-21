import Image from "next/image";
import Link from "next/link";
import { getColor } from "../utils/getColor";
import { getFilters } from "../utils/getFilters";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentageToTwoDecimalPlaces } from "../utils/formatPercentage";
import useSwr from "swr";
import { Table } from "../components/Table";
import { fetchRoute } from "../utils/fetchRoute";
import ClipLoader from "react-spinners/ClipLoader";
import { Listing } from "../types";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { FAVORITE_MUTATION, UNFAVORITE_MUTATION } from "../graphql/mutations";
import { FAVORITES_QUERY } from "../graphql/queries";
import { checkIfFavorite } from "../utils/checkIfFavorite";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
} from "../utils/handleWatchlist";
import { useContext } from "react";
import { SearchContext } from "../utils/searchContext";
import { NextPage } from "next/types";
import { Layout } from "../components/Layout";
import { GenericList } from "../components/GenericList";

const Home: NextPage = () => {
  const { data, error, isValidating } = useSwr("api/listings", fetchRoute);
  const listings: Listing[] = data?.data;
  const { searchInput } = useContext(SearchContext);

  const [addToWatchlist] = useMutation(FAVORITE_MUTATION);
  const [removeFromWatchlist] = useMutation(UNFAVORITE_MUTATION);

  const apollo = useApolloClient();

  const { data: favoritesData, loading } = useQuery(FAVORITES_QUERY, {
    variables: {
      category: "crypto",
    },
  });

  if (error) {
    return (
      <Layout>
        <div className="h-full w-full flex justify-center items-center">
          Something went wrong...
        </div>
      </Layout>
    );
  }

  if (!data || isValidating || loading) {
    return (
      <Layout>
        <div className="w-full h-full flex justify-center items-center">
          <ClipLoader size={40} />
        </div>
      </Layout>
    );
  }

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
          keyExtractor={({ id }) => id.toString()}
          filter={(entry: Listing) =>
            entry.name.trim().toLowerCase().includes(searchInput)
          }
          renderItem={(
            { id, slug, name, quote, symbol, circulating_supply },
            index
          ) => (
            <tr className="border-b-2 border-slate-100 transition duration-250 hover:bg-slate-100">
              <th className="table-entry text-left px-3">
                {checkIfFavorite(id, favoritesData.favorites) ? (
                  <Image
                    src="/icons/star-full.svg"
                    alt=""
                    width={13}
                    height={13}
                    className="cursor-pointer"
                    onClick={() => {
                      console.log(id);
                      handleRemoveFromWatchlist(
                        id,
                        favoritesData.favorites,
                        removeFromWatchlist,
                        apollo.cache
                      );
                    }}
                  />
                ) : (
                  <Image
                    src="/icons/star-empty.svg"
                    alt=""
                    width={13}
                    height={13}
                    className="cursor-pointer"
                    onClick={() =>
                      handleAddToWatchlist(
                        id,
                        favoritesData.favorites,
                        addToWatchlist,
                        apollo.cache
                      )
                    }
                  />
                )}
              </th>
              <th className="table-entry text-left">{index + 1}</th>
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

export default Home;
