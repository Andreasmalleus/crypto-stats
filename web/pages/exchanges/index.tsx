import Image from "next/image";
import { formatCurrency } from "../../utils/formatCurrency";
import { useRouter } from "next/router";
import { Table } from "../../components/Table";
import useSwr from "swr";
import { fetchRoute } from "../../utils/fetchRoute";
import React, { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Exchange } from "../../types";
import { SearchContext } from "../../utils/searchContext";
import { GenericList } from "../../components/GenericList";
import { Layout } from "../../components/Layout";

interface ExchangesPageProps {}

const ExchangesPage: React.FC<ExchangesPageProps> = () => {
  const router = useRouter();
  const { searchInput } = useContext(SearchContext);

  const { data, error, isValidating } = useSwr<Exchange[]>(
    "api/exchanges",
    fetchRoute
  );

  if (error) {
    return (
      <Layout>
        <div className="h-full w-full flex justify-center items-center">
          Something went wrong...
        </div>
      </Layout>
    );
  }

  if (!data || isValidating) {
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
          "#",
          "Name",
          "Score",
          "Volume(BTC)",
          "Country",
          "Year Established",
        ]}
      >
        <GenericList
          items={data}
          keyExtractor={({ id }) => id.toString()}
          filter={(item) =>
            item.name.trim().toLowerCase().includes(searchInput)
          }
          renderItem={(
            {
              id,
              name,
              trust_score,
              trade_volume_24h_btc,
              year_established,
              image,
              country,
            },
            index
          ) => (
            <tr
              key={id}
              className="border-b-2 border-slate-100 transition duration-250 hover:bg-slate-100 cursor-pointer"
              onClick={() => router.push(`/exchanges/${id}`)}
            >
              <th className="table-entry text-left py-5">{index + 1}</th>
              <th className="table-entry text-left">
                <div className="flex items-center cursor-pointer">
                  <Image
                    src={image}
                    alt=""
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="ml-2">{name}</span>
                </div>
              </th>
              <th className="table-entry">{trust_score}</th>
              <th className="table-entry">
                {formatCurrency(trade_volume_24h_btc)}
              </th>
              <th className="table-entry">{country ? country : "not known"}</th>
              <th className="table-entry">
                {year_established ? year_established : "not known"}
              </th>
            </tr>
          )}
        />
      </Table>
    </Layout>
  );
};

export default ExchangesPage;
