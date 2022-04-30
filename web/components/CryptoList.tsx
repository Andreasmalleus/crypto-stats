import Image from "next/image";
import Link from "next/link";
import { getColor } from "../utils/getColor";
import { getFilters } from "../utils/getFilters";
import { formatCurrency } from "../utils/formatCurrency";
import { formatPercentageToTwoDecimalPlaces } from "../utils/formatPercentage";
import useSwr from "swr";
import { Table } from "./Table/index";
import { fetchRoute } from "../utils/fetchRoute";
import { ClipLoader } from "react-spinners";
import { Listing } from "../types";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { FAVORITE_MUTATION, UNFAVORITE_MUTATION } from "../graphql/mutations";
import { FAVORITES_QUERY } from "../graphql/queries";
import { checkIfFavorite } from "../utils/checkIfFavorite";

export const Cryptolist: React.FC = () => {
  const { data, error, isValidating } = useSwr("api/listings", fetchRoute);
  const [addToWishlist] = useMutation(FAVORITE_MUTATION);
  const [removeFromWishlist] = useMutation(UNFAVORITE_MUTATION);

  const category = "crypto";

  const { data: favoritesData, loading } = useQuery(FAVORITES_QUERY, {
    variables: {
      category,
    },
  });

  const apollo = useApolloClient();

  const handleWishlist = async (id: number, remove: boolean) => {
    let response = null;
    const variables = {
      id,
      category,
    };
    if (remove) {
      response = await removeFromWishlist({
        variables,
        update(cache) {
          const normalizedId = cache.identify({ id, __typename: "Favorite" });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });
      return;
    }
    response = await addToWishlist({
      variables,
    });
    apollo.cache.writeQuery({
      query: FAVORITES_QUERY,
      data: {
        favorites: [...favoritesData.favorites, response.data.favorite],
      },
      variables,
    });
  };

  if (error) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        Something went wrong...
      </div>
    );
  }

  if (!data || isValidating || loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ClipLoader size={40} />
      </div>
    );
  }

  return (
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
      {data?.data.map((listing: Listing, index: number) => (
        <tr
          key={listing.id}
          className="border-b-2 border-slate-100 transition duration-250 hover:bg-slate-100"
        >
          <th className="table-entry text-left px-3">
            {checkIfFavorite(listing.id, favoritesData.favorites) ? (
              <Image
                src="/icons/star-full.svg"
                alt=""
                width={13}
                height={13}
                className="cursor-pointer"
                onClick={() => handleWishlist(listing.id, true)}
              />
            ) : (
              <Image
                src="/icons/star-empty.svg"
                alt=""
                width={13}
                height={13}
                className="cursor-pointer"
                onClick={() => handleWishlist(listing.id, false)}
              />
            )}
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
                <span className="ml-2 text-slate-400">{listing.symbol}</span>
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
            style={{ color: getColor(listing.quote.EUR.percent_change_24h) }}
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
            style={{ color: getColor(listing.quote.EUR.percent_change_7d) }}
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
      ))}
    </Table>
  );
};
function FAVORITE_QUERY(FAVORITE_QUERY: any): [any, any] {
  throw new Error("Function not implemented.");
}
