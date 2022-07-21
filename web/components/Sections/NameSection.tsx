import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import {
  FAVORITE_MUTATION,
  UNFAVORITE_MUTATION,
} from "../../graphql/mutations";
import { FAVORITES_QUERY } from "../../graphql/queries";
import { checkIfFavorite } from "../../utils/checkIfFavorite";
import { formatDate } from "../../utils/formatDate";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
} from "../../utils/handleWatchlist";

interface NameSectionProps {
  id: number;
  logo: string;
  name: string;
  symbol: string;
  rank: number;
  category: string;
  updated: string;
  tags: string[];
}

export const NameSection: React.FC<NameSectionProps> = ({
  id,
  logo,
  name,
  symbol,
  rank,
  category,
  updated,
  tags,
}) => {
  const [removeFromWatchlist] = useMutation(UNFAVORITE_MUTATION);
  const [addToWatchlist] = useMutation(FAVORITE_MUTATION);
  const apollo = useApolloClient();

  const { data, loading } = useQuery(FAVORITES_QUERY, {
    variables: {
      category: "crypto",
    },
  });

  if (!data && loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ClipLoader size={40} />
      </div>
    );
  }

  return (
    <section className="flex-col w-4/12">
      {/* image and name of the currency */}
      <div className="flex items-center mb-4">
        <Image src={logo} width={30} height={30} />
        <div className="text-3xl ml-3 font-headings">{name}</div>
        <div className="text-xs text-slate-600 bg-slate-100 border-none rounded-md p-1 ml-3 mr-3">
          {symbol}
        </div>
        {checkIfFavorite(id, data?.favorites) ? (
          <div className="border py-1 px-2 rounded-lg">
            <Image
              src="/icons/star-full.svg"
              alt=""
              width={13}
              height={13}
              className="cursor-pointer"
              onClick={() => handleRemoveFromWatchlist(id, removeFromWatchlist)}
            />
          </div>
        ) : (
          <div className="border py-1 px-2 rounded-lg">
            <Image
              src="/icons/star-empty.svg"
              alt=""
              width={13}
              height={13}
              className="cursor-pointer"
              onClick={() =>
                handleAddToWatchlist(
                  id,
                  data?.favorites,
                  addToWatchlist,
                  apollo.cache
                )
              }
            />
          </div>
        )}
      </div>
      {/* additional information about the currency */}
      <div className="flex mb-6">
        <div className="text-xs text-slate-600 rounded p-1 bg-slate-100 mr-2">
          Rank #{rank}
        </div>
        <div className="text-xs text-slate-600 rounded p-1 bg-slate-100 mr-2">
          {" "}
          {category}
        </div>
        <div className="text-xs text-slate-600 rounded p-1 bg-slate-100">
          Updated: {formatDate(updated)}
        </div>
      </div>
      {/* tags for the currency */}
      <div>
        <div className="text-xs mb-1">Tags: </div>
        <div className="flex mb-2">
          {tags.slice(0, 3).map((tag) => {
            return (
              <div
                key={tag}
                className="text-xs text-slate-600 rounded p-1 bg-slate-100 mr-2"
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
